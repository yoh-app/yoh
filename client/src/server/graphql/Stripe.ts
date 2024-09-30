import { extendType, nonNull, stringArg, objectType, intArg } from 'nexus';
// import { GraphQLJSON } from 'graphql-type-json';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const StripeQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('requireSubscription', {
      type: 'Boolean',
      args: {
        model: nonNull('String'),
        id: nonNull('String'),
      },
      resolve: async (_, { model, id }, { prisma, userId, permission, utils }) => {
        const modelObject = permission.schema.models.find((modelItem) => modelItem.name === model);
        const subscriptionFieldExist = modelObject.fields.find((field) => field.name === 'stripeSubscriptionId');
        if (subscriptionFieldExist) {
          const modelItem = await prisma[utils.capToLowerCase(model)].findUnique({
            where: {
              id,
            },
          });
          if (!modelItem.stripeSubscriptionId) {
            return true;
          }

          const subscription = await stripe.subscriptions.retrieve(modelItem.stripeSubscriptionId);
          console.log(subscription.current_period_end, Date.now());
          if (subscription.current_period_end < Date.now() / 1000) {
            return true;
          } else {
            return false;
          }
        }

        return false;
      },
    });
    t.field('stripeEnabled', {
      type: 'Boolean',
      args: { websiteSlug: nonNull('String'), },
      resolve: async (_, { websiteSlug }, { prisma, permission }) => {
        if (!websiteSlug) return false;

        const website = await prisma.website.findUnique({
          where: {
            slug: websiteSlug
          },
        })

        if (!website?.stripeAccountId) {
          return false
        } else {
          const account = await stripe.accounts.retrieve(website?.stripeAccountId);
          if (account.charges_enabled) {
            return true
          } else {
            return false
          }
        }
      },
    });
    t.field('stripeAccountStatus', {
      type: 'Json',
      args: {},
      resolve: async (_, { }, { prisma, userId, permission }) => {
        return null
        if (!permission?.Website) return null;
        const websiteId = permission?.Website
        let website = await prisma.website.findUnique({
          where: {
            id: websiteId,
          },
        });
        let account;

        if (!website?.stripeAccountId) {
          const newAccount = await stripe.accounts.create({
            type: 'express',
          });
          account = newAccount;
          website = await prisma.website.update({
            where: {
              id: website.id,
            },
            data: {
              stripeAccountId: account.id,
            },
          });
        } else {
          account = await stripe.accounts.retrieve(website.stripeAccountId);
        }

        if (account.charges_enabled) {
          return {
            accountLink: 'access',
          };
        } else {
          const accountLink = await stripe.accountLinks.create({
            account: website?.stripeAccountId,
            refresh_url:
              `${process.env.PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/admin/Website/Website/Onboard/`,
            return_url:
              `${process.env.PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/admin/Website/Website/Onboard/`,

            type: 'account_onboarding',
          });
          return { accountLink };
        }
      },
    });
  },
});

export const StripeMutation = extendType({
  type: 'Mutation',
  definition(t) {

    t.field('prepareStripePurchase', {
      type: 'Json',
      args: {
        // items: nonNull('Json'),
        // item: nonNull('Json'),
        productId: nonNull(stringArg()),
        websiteSlug: nonNull(stringArg()),
        // couponCode: stringArg(),
        // shippingId: stringArg(),
        customerId: nonNull(stringArg()),
        // paymentAddress: nonNull(stringArg()),
      },
      resolve: async (_, { productId, websiteSlug, paymentAddress,
        customerId }, { prisma, userId }) => {
        try {
          const website = await prisma.website.findUnique({
            where: {
              slug: websiteSlug,
            },
          });

          if (!website?.stripeAccountId) {
            throw new Error('Stripe not setup yet')
          } else {
            const account = await stripe.accounts.retrieve(website?.stripeAccountId);
            if (account.charges_enabled) {
              const customer = customerId ? await prisma.customer.findUnique({
                where: {
                  id: customerId,
                },
              }) : null;

              const product = await prisma.product.findUnique({
                where: {
                  id: productId
                }
              })

              // const applicationFee = (product.price - product?.storageSize) * 0.05
              // const storageFee = product?.storageSize
              const orderedProduct = {
                name: product?.name,
                description: product?.description,
                imageObj: product?.imageObj,
                product: {
                  connect: {
                    id: product?.id,
                  },
                },
                website: {
                  connect: {
                    id: website.id
                  }
                },
                minted: false,
                productSlug: product?.slug,
                productType: product?.productType,
                price: product?.price,
                quantity: 1,
                itemTotal: product?.price,
              }

              const stripeFee = Math.round((product.price * stripeFeeMultiplier + 0.3) * 100) / 100
              const applicationFee = Math.round(product.price * yohFeeMultiplier * 100) / 100
              const newOrder = await prisma.order.create({
                data: {
                  // paymentAddress,
                  walletAddress: paymentAddress,
                  product: {
                    connect: {
                      id: product.id
                    }
                  },
                  customer: customer && customerId ? {
                    connect: {
                      id: customerId,
                    },
                  } : undefined,
                  orderStatus: 'pending',
                  website: {
                    connect: {
                      id: website?.id,
                    },
                  },
                  applicationFee,
                  stripeFee,
                  // storageFee: attachmentsSizeInMegabytes,
                  // storageFee,
                  amount: product.price,
                  total: Math.round((product.price - stripeFee - applicationFee) * 100) / 100,
                  currencyCode: website.currencyCode ? website.currencyCode : 'usd',
                  orderedProducts: {
                    create: [orderedProduct],
                  },
                },
              });

              const session = await stripe.checkout.sessions.create(
                {
                  payment_method_types: ['card'],
                  mode: 'payment',
                  locale: website.languageCode || 'en',
                  line_items: [{
                    price_data: {
                      // The currency parameter determines which
                      // payment methods are used in the Checkout Session.
                      currency: website.currencyCode ? website.currencyCode : 'usd',
                      product_data: {
                        name: product.name,
                        description: product.description,
                        images: [product.imageObj.url],
                      },
                      unit_amount: Math.ceil(product.price * 100),
                    },
                    quantity: 1,
                  }],
                  customer_email: customer.email,
                  payment_intent_data: {
                    application_fee_amount: Math.ceil(applicationFee * 100),
                  },
                  metadata: {
                    type: 'order',
                    userId,
                    websiteId: website.id,
                    customerId: customerId,
                    orderId: newOrder.id,
                    // cartId: cartTokenInfo.id,
                  },
                  // customer: customer.id,
                  // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
                  success_url:
                    process.env.NODE_ENV === 'production'
                      ? `https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product.slug}`
                      : `http://www.awkns.local:3003/products/${product.slug}`,
                  cancel_url:
                    process.env.NODE_ENV === 'production'
                      ? `https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
                      : `http://www.awkns.local:3003/`,
                },
                {
                  stripeAccount: website?.stripeAccountId,
                },
              );
              const updateOrder = await prisma.order.update({
                where: {
                  id: newOrder.id,
                },
                data: {
                  stripePrivateSessionId: session.id,
                },
              });
              return {
                session,
                stripeAccountId: website?.stripeAccountId,
                order: updateOrder
              };

            } else {
              throw new Error('Stripe not setup yet')
            }
          }
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    });

    t.field('createCheckoutSession', {
      type: 'Json',
      args: {
        priceId: nonNull(stringArg()),
        model: nonNull(stringArg()),
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, { priceId, model, id }, { userId, permission, prisma, utils }) => {
        const domainURL = process.env.HOST;

        if (!userId || !permission?.admin) {
          throw new Error('authorization required');
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const { cleanPermission } = utils;
        const metadata = { ...cleanPermission(permission), model, id };
        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          payment_method_types: ['card'],

          customer: user?.stripeCustomerId && user?.stripeCustomerId.length > 0 ? user.stripeCustomerId : undefined,
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          subscription_data: {
            metadata,
          },
          // metadata,
          // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
          success_url: `${domainURL}/admin/enter/${model}/${id}`,
          cancel_url: `${domainURL}/admin/subscribe/${model}/${id}`,
        });
        return session;
      },
    });
    t.field('stripeCheckout', {
      type: 'Json',
      args: {
        items: nonNull('Json'),
        websiteSlug: nonNull(stringArg()),
        couponCode: stringArg(),
        shippingId: stringArg(),
        customerId: nonNull(stringArg()),
      },
      resolve: async (_, { items, websiteSlug, couponCode, shippingId, customerId }, { prisma, userId }) => {
        try {
          if (!userId || !customerId) {
            throw new Error('Not Authorized');
          }
          const website = await prisma.website.findUnique({
            where: {
              slug: websiteSlug,
            },
            include: {
              user: true,
              taxes: true,
            },
          });

          const customer = await prisma.customer.findUnique({
            where: {
              id: customerId,
            },
          });

          if (!website?.user?.stripeAccountId) {
            throw new Error('Owner has not setup payment yet');
          }

          const account = await stripe.accounts.retrieve(website?.user.stripeAccountId);

          if (!account.charges_enabled) {
            throw new Error('Owner has not setup payment yet');
          }

          const products = await prisma.product.findMany({
            where: {
              id: {
                in: items.map((item) => {
                  if (item?.productType === 'variable') {
                    return item?.productId;
                  } else {
                    return item.id;
                  }
                }),
              },
            },
            include: {
              videos: true,
              audios: true,
              links: true,
            },
          });
          items.forEach((item) => {
            const product = products.find((_product) => {
              if (item?.productType === 'variable') {
                return _product.id === item.productId;
              } else {
                return _product.id === item.id;
              }
            });
            if (!item || !product) {
              throw new Error(`${item?.name} doesnt exist`);
            }
            if (product.productType === 'simple' && item.quantity > product.quantity) {
              throw new Error(`${item.name} is out of stock`);
            } else if (product.productType === 'variable') {
              const variationItem = product.variation_options.find((variation) => variation.id === item.variationId);
              if (!variationItem) {
                throw new Error(`${item.name} ${item?.variationId} doesnt exist`);
              }
              if (item.quantity > variationItem.quantity) {
                throw new Error(`${item.name} is out of stock`);
              }
            }
            item.product = product;
          });

          const digitalProductAttachmentUrls = products
            .filter((product) => product.productType === 'digital')
            .reduce((prev, current) => {
              if (current?.videos?.length > 0) {
                current.videos.forEach(video => {
                  if (video?.videoObj?.url) {
                    prev.push(video?.videoObj?.url)
                  }
                });
                // newValue = [...newValue, current.videos.map((video) => video?.videoObj?.url)];
              }
              if (current?.audios?.length > 0) {
                current.audios.forEach(audio => {
                  if (audio?.audioObj?.url) {
                    prev.push(audio?.audioObj?.url)
                  }
                });
                // newValue = [...newValue, current.audios.map((audio) => audio?.audioObj?.url)];
              }
              return prev;
            }, []);
          const attachments =
            digitalProductAttachmentUrls?.length > 0
              ? await prisma.attachment.findMany({
                where: {
                  url: {
                    in: digitalProductAttachmentUrls,
                  },
                },
              })
              : [];
          const attachmentsSizeInBytes = attachments.reduce((prev, current) => {
            return prev + current?.upload?.size;
          }, 0);
          const attachmentsSizeInMegabytes = Math.ceil(attachmentsSizeInBytes * 0.000000001);
          await Promise.all(
            items.map(async (item) => {
              const stripeProduct = await stripe.products.create(
                {
                  name: item?.product?.name,
                  ...(item?.product?.description ? {} : undefined),
                  ...(item?.product?.imageObj ? { images: [item?.product?.imageObj?.url] } : undefined),
                },
                {
                  stripeAccount: website?.user?.stripeAccountId,
                },
              );
              item.stripePrivateProductId = stripeProduct.id;
            }),
          );

          const coupon = couponCode
            ? await prisma.coupon.findFirst({
              where: {
                code: {
                  equals: couponCode,
                },
                website: {
                  slug: {
                    equals: websiteSlug,
                  },
                },
              },
            })
            : null;

          if (
            coupon &&
            Date.now() < new Date(coupon.expire_at).getTime() &&
            Date.now() > new Date(coupon.active_from).getTime()
          ) {
            let stripeCoupon;
            if (coupon.couponType === 'amount_off') {
              stripeCoupon = await stripe.coupons.create(
                {
                  // percent_off: coupon.percent_off,
                  name: coupon.name,
                  currency: website.currencyCode ? website.currencyCode : 'usd',
                  amount_off: coupon.amount_off * 100,
                  applies_to: { products: items.map((item) => item?.stripePrivateProductId) },
                },
                {
                  stripeAccount: website?.user?.stripeAccountId,
                },
              );
            } else {
              stripeCoupon = await stripe.coupons.create(
                {
                  percent_off: coupon.percent_off,
                  name: coupon.name,
                  // amount_off: coupon.amount_off * 100,
                  applies_to: { products: items.map((item) => item?.stripePrivateProductId) },
                },
                {
                  stripeAccount: website?.user?.stripeAccountId,
                },
              );
            }

            coupon.stripePrivateCouponId = stripeCoupon.id;
          }
          const requireShipping = !!items?.find(
            (item) => item.productType === 'simple' || item.productType === 'variable',
          );
          const shipping =
            requireShipping && shippingId
              ? await prisma.shipping.findUnique({
                where: {
                  id: shippingId,
                },
              })
              : null;

          const line_items = items.map((item) => {
            return {
              price_data: {
                currency: website.currencyCode ? website.currencyCode : 'usd',
                unit_amount: Math.ceil(item?.price * 100),
                product: item?.stripePrivateProductId,
              },
              ...(item.productType !== 'digital'
                ? {
                  dynamic_tax_rates: website?.taxes?.map((tax) => tax.stripePrivateTaxId),
                }
                : undefined),
              quantity: item.quantity,
            };
          });

          if (shipping) {
            line_items.push({
              price_data: {
                currency: website.currencyCode ? website.currencyCode : 'usd',
                unit_amount: shipping.amount * 100,
                product_data: {
                  name: shipping.name,
                },
              },
              quantity: 1,
            });
          }
          const amount = items.reduce((total, item) => total + item.quantity! * item.price, 0);
          const applicationFee = items.reduce((total, item) => total + item.quantity! * item.price, 0) * 0.02;
          const orderedProducts = items.map((item) => {
            return {
              name: item?.product?.name,
              description: item?.product?.description,
              imageObj: item?.product?.imageObj,
              product: {
                connect: {
                  id: item?.product?.id,
                },
              },
              website: {
                connect: {
                  id: website.id
                }
              },
              productSlug: item?.product?.slug,
              productType: item?.product?.productType,
              price: item?.price,
              quantity: item?.quantity,
              itemTotal: item?.price * item?.quantity!,
              variationId: item?.variationId,
              ...(item?.product?.videos?.length > 0
                ? {
                  orderedVideos: {
                    create: item.product.videos.map((video) => {
                      return {
                        name: video.name,
                        description: video.description,
                        imageObj: video.imageObj,
                        videoObj: video.videoObj,
                        video: {
                          connect: {
                            id: video.id,
                          },
                        },
                      };
                    }),
                  },
                }
                : undefined),
              ...(item?.product?.audios?.length > 0
                ? {
                  orderedAudios: {
                    create: item.product.audios.map((audio) => {
                      return {
                        name: audio.name,
                        description: audio.description,
                        imageObj: audio.imageObj,
                        audioObj: audio.audioObj,
                        audio: {
                          connect: {
                            id: audio.id,
                          },
                        },
                      };
                    }),
                  },
                }
                : undefined),
              ...(item?.product?.links?.length > 0
                ? {
                  orderedLinks: {
                    create: item.product.links.map((link) => {
                      return {
                        name: link.name,
                        description: link.description,
                        imageObj: link.imageObj,
                        url: link.url,
                        link: {
                          connect: {
                            id: link.id,
                          },
                        },
                      };
                    }),
                  },
                }
                : undefined),
            };
          });

          const newOrder = await prisma.order.create({
            data: {
              customer: {
                connect: {
                  id: customerId,
                },
              },
              orderStatus: 'pending',
              website: {
                connect: {
                  id: website?.id,
                },
              },
              applicationFee,
              storageFee: attachmentsSizeInMegabytes,
              requireShipping,
              ...(coupon
                ? {
                  coupon: {
                    connect: {
                      id: coupon.id,
                    },
                  },
                }
                : undefined),
              delivery_fee: shipping?.amount ?? 0,
              delivery_name: shipping?.name,
              amount,
              orderedProducts: {
                create: orderedProducts,
              },
            },
          });

          const session = await stripe.checkout.sessions.create(
            {
              payment_method_types: ['card'],
              mode: 'payment',
              locale: website.languageCode || 'en',
              line_items,
              customer_email: customer.email,
              payment_intent_data: {
                application_fee_amount: Math.ceil((applicationFee + attachmentsSizeInMegabytes) * 100),
              },
              metadata: {
                type: 'order',
                userId,
                websiteId: website.id,
                customerId: customerId,
                orderId: newOrder.id,
                // cartId: cartTokenInfo.id,
              },
              ...(coupon?.stripePrivateCouponId
                ? { discounts: [{ coupon: coupon.stripePrivateCouponId }] }
                : undefined),
              ...(requireShipping
                ? {
                  shipping_address_collection: {
                    allowed_countries: [website.countryCode],
                  },
                }
                : undefined),
              // customer: customer.id,
              // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
              success_url:
                process.env.NODE_ENV === 'production'
                  ? `https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/orders/${newOrder.id}`
                  : `http://www.awkns.local:3003/orders/${newOrder.id}`,
              cancel_url:
                process.env.NODE_ENV === 'production'
                  ? `https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
                  : `http://www.awkns.local:3003/`,
            },
            {
              stripeAccount: website?.user?.stripeAccountId,
            },
          );
          const updateOrder = await prisma.order.update({
            where: {
              id: newOrder.id,
            },
            data: {
              stripePrivateSessionId: session.id,
            },
          });

          return {
            session,
            stripeAccountId: website?.user.stripeAccountId,
          };
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    });
  },
});
