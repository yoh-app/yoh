import { extendType, nonNull, stringArg, objectType } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
// import { GraphQLJSON } from 'graphql-type-json'
import { permissions } from '../permission'

import { getWebsiteAnalytics } from '../utils/websiteAnalytics';
// import { createdDropAbi } from '../utils/zora'
import Web3 from 'web3'
import sendOrderEmail from '../magic/utils/emailTemplates/sendOrder';
import SingleEditionMintable_ABI from '../../contractsData/polygon-SingleEditionMintable.json'

import receiveOrderEmail from '../magic/utils/emailTemplates/receiveOrder';

import { useLocale } from '../../utils/mailLocales';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const { Magic } = require('@magic-sdk/admin')
// const magic = new Magic(process.env.MAGIC_SECRET_KEY)

// export const AuthResponse = objectType({
//   name: 'AuthResponse',
//   definition(t) {
//     t.field('token', { type: 'String' })
//     t.field('user', { type: 'User' })
//     t.field('permission', { type: GraphQLJSON })
//   },
// })
const yohFeeMultiplier = 0.05
const stripeFeeMultiplier = 0.029

export const PaymentQueries = extendType({
  type: 'Query',
  definition(t) {

  },
})

export const PaymentMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('getAnalytics', {
      type: 'Json',
      args: {
        type: nonNull('String'),
        beginSec: nonNull('Int'),
        endSec: nonNull('Int'),
        wedsiteId: nonNull('String'),
        isRenew: 'Boolean',
      },
      resolve: async (_, { type, beginSec, endSec, wedsiteId, isRenew }, { prisma, userId, permission, utils }) => {
        if (!permission?.admin || !permission[permission?.admin]) {
          throw new Error('Need either project or admin id in permission');
        }

        return getWebsiteAnalytics(prisma, { type, beginSec, endSec, wedsiteId, isRenew })
      },
    })

    t.field('payProduct', {
      type: 'Order',
      args: {
        // items: nonNull('Json'),
        // item: nonNull('Json'),
        productId: nonNull(stringArg()),
        websiteSlug: nonNull(stringArg()),
        // couponCode: stringArg(),
        // shippingId: stringArg(),
        customerId: nonNull(stringArg()),
        paymentAddress: nonNull(stringArg()),
      },
      resolve: async (_, { productId, websiteSlug, paymentAddress,
        // couponCode, 
        // shippingId,
        customerId }, { prisma, userId }) => {
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

          const product = await prisma.product.findUnique({
            where: {
              id: productId
            },
          })
          if (product.editionType === 'limited') {
            if (product.quantity - product.quantityUsed < 1) {
              throw new Error('Out of stock')
            }
          }

          const digitalProductAttachmentUrls = []
          if (product?.videos?.length > 0) {
            product.videos.forEach(video => {
              if (video?.videoObj?.url) {
                digitalProductAttachmentUrls.push(video?.videoObj?.url)
              }
            });
          }
          if (product?.audios?.length > 0) {
            product.audios.forEach(audio => {
              if (audio?.audioObj?.url) {
                digitalProductAttachmentUrls.push(audio?.audioObj?.url)
              }
            });
          }
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
          const amount = product.price
          const applicationFee = product.price * 0.02

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
            productSlug: product?.slug,
            productType: product?.productType,
            price: product?.price,
            quantity: 1,
            total: product.price,
          }


          const newOrder = await prisma.order.create({
            data: {
              // paymentAddress,
              walletAddress: paymentAddress,
              customer: {
                connect: {
                  id: customerId,
                },
              },
              // orderStatus: 'pending',
              website: {
                connect: {
                  id: website?.id,
                },
              },
              applicationFee,
              storageFee: attachmentsSizeInMegabytes,
              amount,
              total: amount - attachmentsSizeInMegabytes - applicationFee,
              orderedProducts: {
                create: [orderedProduct],
              },
            },
          });
          return newOrder
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    });
    t.field('prepareRequest', {
      type: 'Json',
      args: {
        requestId: nonNull(stringArg()),
      },
      resolve: async (_, { requestId }, { prisma, userId }) => {
        try {
          // const userId = getUserId(req);
          const request = await prisma.request.findUnique({
            where: {
              id: requestId,
            },
            include: {
              customer: {
                include: {
                  user: true,
                },
              },
              page: {
                include: {
                  website: {
                    include: {
                      user: true,
                    },
                  },
                }
              }
            },
          })
          const applicationFee = request.price * yohFeeMultiplier
          if (request.requestStatus === 'processing') {
            const session = await stripe.checkout.sessions.create(
              {
                payment_method_types: ['card'],
                mode: 'payment',
                locale: request.page.website.languageCode || 'en',
                line_items: [
                  {
                    quantity: 1,
                    price_data: {
                      currency: request?.website?.currencyCode || 'usd',
                      unit_amount: Math.ceil(request.price * 100),
                      product_data: {
                        name: request.subject,
                        description: request.message,
                        images: [request?.imageObj?.url]
                      },
                    },
                  },
                ],
                payment_intent_data: {
                  application_fee_amount: Math.ceil(applicationFee * 100),
                },
                customer_email: request?.customer?.email,
                metadata: {
                  type: 'request',
                  requestId: request.id,
                  // cartId: cartTokenInfo.id,
                },
                // customer: customer.id,
                // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
                success_url:
                  process.env.NODE_ENV === 'production'
                    ? `https://${request.page.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${request?.page?.slug}`
                    : `http://www.awkns.local:3003/pages/${request?.page?.slug}`,
                cancel_url:
                  process.env.NODE_ENV === 'production'
                    ? `https://${request.page.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
                    : `http://www.awkns.local:3003/`,
              },
              {
                stripeAccount: request?.page.website?.stripeAccountId,
              },
            )
            return session
          }

        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      },
    });

    t.field('preparePurchase', {
      type: 'Json',
      args: {
        // items: nonNull('Json'),
        // item: nonNull('Json'),
        productId: nonNull(stringArg()),
        websiteSlug: nonNull(stringArg()),
        // couponCode: stringArg(),
        // shippingId: stringArg(),
        customerId: stringArg(),
        paymentAddress: nonNull(stringArg()),
        quantity: nonNull('Int'),
        affiliateWalletAddress: stringArg(),
      },
      resolve: async (_, { productId, websiteSlug, paymentAddress, affiliateWalletAddress,
        customerId, quantity }, { prisma, userId }) => {
        try {
          const website = await prisma.website.findUnique({
            where: {
              slug: websiteSlug,
            },
            // include: {
            //   user: true,
            //   // taxes: true,
            // },
          });
          let customer = null;

          if (customerId) {
            customer = await prisma.customer.findUnique({
              where: {
                id: customerId,
              },
            })
            if (customer?.id && !customer?.walletAddress) {
              await prisma.customer.update({
                where: {
                  id: customer.id
                },
                data: {
                  walletAddress: paymentAddress
                }
              })
            }
          } else if (paymentAddress) {
            customer = await prisma.customer.findFirst({
              where: {
                walletAddress: {
                  equals: paymentAddress
                },
                website: {
                  id: {
                    equals: website?.id
                  }
                }
              },
            })
            if (!customer) {
              customer = await prisma.customer.create({
                data: {
                  walletAddress: paymentAddress,
                  website: {
                    connect: {
                      id: website.id
                    }
                  }
                }
              });
            }
          }

          const product = await prisma.product.findUnique({
            where: {
              id: productId
            },
            include: {
              website: true
            }
          })
          const affiliateFee = product?.website?.slug === websiteSlug ? 0 : Math.round(product.price * product.commissionFee * 100) / 100
          const applicationFee = Math.round(product.price * yohFeeMultiplier * 100) / 100
          // const storageFee = product?.storageSize

          if (product?.quantity && product.quantity < quantity) {
            throw new Error('Purchased quantity is over than in stock');
          }
          let newOrder, newAffiliateOrder
          const currentPrice = product?.salePrice || product?.price;
          const orderedProduct = {
            name: product?.name,
            description: product?.description,
            imageObj: product?.imageObj,
            product: {
              connect: {
                id: product?.id,
              },
            },
            // website: {
            //   connect: {
            //     id: website.id
            //   }
            // },
            productSlug: product?.slug,
            productType: product?.productType,
            price: currentPrice,
            quantity: quantity,
            minted: false,
            total: currentPrice * quantity,
          }

          newOrder = await prisma.order.create({
            data: {
              // paymentAddress,
              walletAddress: paymentAddress,
              ...affiliateWalletAddress ? {
                affiliateWalletAddress: affiliateWalletAddress
              } : undefined,
              // product: {
              //   connect: {
              //     id: product.id
              //   }
              // },
              ...customer?.id ? {
                customer: {
                  connect: {
                    id: customer.id
                  }
                }
              } : undefined,
              // orderStatus: 'pending',
              // paid: false,

              // For test
              // paid: true,

              website: {
                connect: {
                  id: product?.website?.id,
                },
              },
              applicationFee,
              affiliateFee,
              // storageFee: attachmentsSizeInMegabytes,
              // storageFee,
              amount: product.price,
              total: Math.round((product.price - applicationFee - affiliateFee) * 100) / 100,
              orderedProducts: {
                create: [orderedProduct],
              },
            },
          });
          // if (websiteSlug !== product.website.slug) {
          //   newAffiliateOrder = await prisma.order.create({
          //     data: {
          //       // paymentAddress,
          //       walletAddress: paymentAddress,
          //       // product: {
          //       //   connect: {
          //       //     id: product.id
          //       //   }
          //       // },
          //       // ...customer?.id ? {
          //       //   customer: {
          //       //     connect: {
          //       //       id: customer.id
          //       //     }
          //       //   }
          //       // } : undefined,
          //       // orderStatus: 'pending',
          //       // paid: false,
          //       website: {
          //         connect: {
          //           id: website?.id,
          //         },
          //       },
          //       isAffiliate: true,
          //       applicationFee,
          //       affiliateFee,
          //       // storageFee: attachmentsSizeInMegabytes,
          //       // storageFee,
          //       amount: product.price,
          //       total: affiliateFee,
          //       orderedProducts: {
          //         create: [orderedProduct],
          //       },
          //     },
          //   });
          // }
          // await prisma.product.update({
          //   where: {
          //     id: productId
          //   },
          //   data: {
          //     quantitySold: (product.quantitySold || 0) + quantity
          //   }
          // })
          return newOrder
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    });
    t.field('finishPurchase', {
      type: 'Json',
      args: {
        orderId: nonNull(stringArg()),
        transactionHash: nonNull(stringArg()),
        // affiliateOrderId: stringArg()
      },
      resolve: async (_, { orderId, transactionHash }, { prisma, userId, domain }) => {
        try {

          const order = await prisma.order.update({
            where: {
              id: orderId
            },
            data: {
              transactionHash,
              paid: true
            },
            include: {
              website: {
                include: {
                  user: true
                }
              },
              customer: {
                include: {
                  user: true
                }
              },
              orderedProducts: {
                include: {
                  product: true
                }
              }
            }
          })

          await Promise.all(order?.orderedProduct?.map(async (orderedProduct) => {
            await prisma.product.update({
              where: {
                id: orderedProduct?.product?.id
              },
              data: {
                quantitySold: (orderedProduct?.product.quantitySold || 0) + orderedProduct?.quantity
              }
            })
          }))

          const translator = useLocale(order.website.languageCode);

          if (order?.customer?.email || order?.customer?.user?.email) {
            const email = order?.customer?.email || order?.customer?.user?.email
            const sendOrderEmailHtml = sendOrderEmail(domain, order, translator);

            // cleanCache({ websiteId: order.website.id, prisma });
            const customerEmailConfig = {
              to: email,
              from: {
                email: process.env.EMAIL_FROM,
                name: process.env.EMAIL_FROMNAME,
              },
              subject: translator['WebsiteAdmin.Mail.Order.placed'],
              html: sendOrderEmailHtml,
            };
            await sgMail.send(customerEmailConfig)
          }


          const receiveOrderEmailHtml = receiveOrderEmail(domain, order, translator);

          const websiteEmailConfig = {
            to: order.website.user.email,
            from: {
              email: process.env.EMAIL_FROM,
              name: process.env.EMAIL_FROMNAME,
            },
            subject: translator['WebsiteAdmin.Mail.Order.sold'],
            html: receiveOrderEmailHtml,
          };
          await sgMail.send(websiteEmailConfig)
          const websiteNotification = await prisma.notification.create({
            data: {
              model: 'Order',
              modelId: order.id,
              title: 'Order',
              description: `Order ${order.id} paid`,
              url: `/admin/Website/Website/Order?view=${order.id}`,
              action: 'view',
              isUnRead: true,
              website: {
                connect: {
                  id: order.website.id
                }
              }
            }
          })

          // if (affiliateOrderId) {
          //   const affiliateOrder = await prisma.order.update({
          //     where: {
          //       id: affiliateOrderId
          //     },
          //     data: {
          //       transactionHash,
          //       paid: true
          //     },
          //     include: {
          //       website: {
          //         include: {
          //           user: true
          //         }
          //       },
          //       customer: {
          //         include: {
          //           user: true
          //         }
          //       },
          //       orderedProducts: {
          //         include: {
          //           product: true
          //         }
          //       }
          //     }
          //   })
          //   const affiliateTranslator = useLocale(order.website.languageCode);
          //   const affiliateReceiveOrderEmailHtml = receiveOrderEmail(domain, affiliateOrder, affiliateTranslator);

          //   const affiliateWebsiteEmailConfig = {
          //     to: affiliateOrder.website.user.email,
          //     from: {
          //       email: process.env.EMAIL_FROM,
          //       name: process.env.EMAIL_FROMNAME,
          //     },
          //     subject: translator['WebsiteAdmin.Mail.Order.sold'],
          //     html: affiliateReceiveOrderEmailHtml,
          //   };
          //   await sgMail.send(affiliateWebsiteEmailConfig)
          //   const affiliateWebsiteNotification = await prisma.notification.create({
          //     data: {
          //       model: 'Order',
          //       modelId: affiliateOrder.id,
          //       title: 'Order',
          //       description: `Order ${affiliateOrder.id} paid`,
          //       url: `/admin/Website/Website/Order?view=${affiliateOrder.id}`,
          //       action: 'view',
          //       isUnRead: true,
          //       website: {
          //         connect: {
          //           id: affiliateOrder.website.id
          //         }
          //       }
          //     }
          //   })
          // }


        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    });
    t.field('updateOrder', {
      type: 'Order',
      args: {
        orderId: nonNull('String'),
        transactionHash: 'String'
      },
      resolve: async (_, { orderId, transactionHash }, { prisma, userId, permission, utils }) => {
        // if (!permission?.admin || !permission[permission?.admin]) {
        //   throw new Error('Need either project or admin id in permission');
        // }

        const order = await prisma.order.findUnique({
          where: {
            id: orderId
          },
          include: {
            website: {
              include: {
                user: true
              }
            },
            customer: {
              include: {
                user: true
              }
            },
            orderedProducts: {
              include: {
                product: true
              }
            }
          }
        })
        const product = order?.orderedProducts?.[0]?.product

        if (transactionHash) {
          const updateOrderedProduct = await prisma.orderedProduct.update({
            where: {
              id: order?.orderedProducts?.[0]?.id
            },
            data: {
              minted: true,
              // editionMinted: product?.editionMinted ? product?.editionMinted + 1 : 1
            }
          })
        }

        const updatedOrder = await prisma.order.update({
          where: {
            id: orderId
          },
          data: {
            transactionHash: transactionHash ? transactionHash : undefined,
            // orderStatus: 'completed'
          }
        })


        const translator = useLocale(order.website.languageCode);

        if (order?.customer?.email || order?.customer?.user?.email) {
          const email = order?.customer?.email || order?.customer?.user?.email
          const sendOrderEmailHtml = sendOrderEmail(order, translator);

          // cleanCache({ websiteId: order.website.id, prisma });
          const customerEmailConfig = {
            to: email,
            from: {
              email: process.env.EMAIL_FROM,
              name: process.env.EMAIL_FROMNAME,
            },
            subject: translator['WebsiteAdmin.Mail.Order.placed'],
            html: sendOrderEmailHtml,
          };
          await sgMail.send(customerEmailConfig)
        }


        const receiveOrderEmailHtml = receiveOrderEmail(order, translator);

        const websiteEmailConfig = {
          to: order.website.user.email,
          from: {
            email: process.env.EMAIL_FROM,
            name: process.env.EMAIL_FROMNAME,
          },
          subject: translator['WebsiteAdmin.Mail.Order.sold'],
          html: receiveOrderEmailHtml,
        };
        await sgMail.send(websiteEmailConfig)
        const websiteNotification = await prisma.notification.create({
          data: {
            model: 'Order',
            modelId: order.id,
            title: 'Order',
            description: `Order ${order.id} paid`,
            url: `/admin/Website/Website/Order?view=${order.id}`,
            action: 'view',
            isUnRead: true,
            website: {
              connect: {
                id: order.website.id
              }
            }
          }
        })

        return updatedOrder
      },
    })

    t.field('serverMint', {
      type: 'Json',
      args: {
        walletAddress: nonNull('String'),
        orderedProductId: nonNull('String'),
      },
      resolve: async (_, { orderedProductId, walletAddress }, { prisma, userId, permission, utils }) => {
        // if (!permission?.admin || !permission[permission?.admin]) {
        //   throw new Error('Need either project or admin id in permission');
        // }
        if (!userId) {
          throw new Error('Please login')
        }
        const orderedProduct = await prisma.orderedProduct.findUnique({
          where: {
            id: orderedProductId
          },
          include: {
            product: true,
            order: {
              include: {
                customer: {
                  include: {
                    user: true
                  }
                },
                // customer: true,
                website: true
              }
            }
          }
        })

        if (orderedProduct?.order?.customer?.user?.id !== userId) {
          throw new Error('User did not purchase this item')
        }
        if (orderedProduct?.minted) {
          throw new Error('OrderedProduct minted')
        }

        const order = orderedProduct?.order
        // const order = await prisma.order.findUnique({
        //   where: {
        //     id: orderId
        //   },
        //   include: {
        //     organization: true,
        //     customer: true,
        //     orderedProducts: {
        //       include: {
        //         product: true
        //       }
        //     }
        //   }
        // })
        const customer = order?.customer;
        const product = orderedProduct?.product

        const privateKey = process.env.ADMIN_PRIVATE_KEY;
        const adminAddress = process.env.ADMIN_ADDRESS;

        // const rinkebyWeb3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/qh13neqK8r6SKEmGplnnNWl-lYYMx2G4');
        const polygonWeb3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/P4syZVbWDSOnspLGHHPyqqP_b4kzgqXA');
        const klaytnWeb3 = new Web3('https://public-node-api.klaytnapi.com/v1/cypress');

        // const rinkebyNetworkId = await rinkebyWeb3.eth.net.getId();
        const polygonNetworkId = await polygonWeb3.eth.net.getId();
        const klaytnNetworkId = await klaytnWeb3.eth.net.getId();

        // const rinkebyContract = new rinkebyWeb3.eth.Contract(createdDropAbi.abi, product.editionAddress);
        const polygonContract = new polygonWeb3.eth.Contract(SingleEditionMintable_ABI.abi, product.editionAddress);
        const klaytnContract = new klaytnWeb3.eth.Contract(SingleEditionMintable_ABI.abi, product.editionAddress);

        // rinkebyWeb3.eth.accounts.wallet.add(privateKey);
        polygonWeb3.eth.accounts.wallet.add(privateKey);
        klaytnWeb3.eth.accounts.wallet.add(privateKey);


        let tx, gasPrice, nonce, txData, receipt;

        if (order?.website?.chain?.name === 'Polygon') {

          tx = polygonContract.methods.mintEdition(walletAddress);
          gasPrice = await polygonWeb3.eth.getGasPrice();
          nonce = await polygonWeb3.eth.getTransactionCount(adminAddress);
          const data = tx.encodeABI();

          txData = {
            from: adminAddress,
            to: polygonContract.options.address,
            data: data,
            gas: 800000,
            gasPrice,
            nonce,
            chain: 'polygon',
            hardfork: 'london',
          }
          receipt = await polygonWeb3.eth.sendTransaction(txData);
        } else if (order?.website?.chain?.name === 'Klaytn') {
          tx = klaytnContract.methods.mintEdition(walletAddress);
          gasPrice = await klaytnWeb3.eth.getGasPrice();
          nonce = await klaytnWeb3.eth.getTransactionCount(adminAddress);
          const data = tx.encodeABI();

          txData = {
            from: adminAddress,
            to: klaytnContract.options.address,
            data: data,
            gas: 800000,
            gasPrice,
            nonce,
            chain: 'klaytn',
            hardfork: 'london',
          }
          receipt = await klaytnWeb3.eth.sendTransaction(txData);
        }

        // } 

        // else {
        //   tx = rinkebyContract.methods.adminMint(order.walletAddress, 1);
        //   gasPrice = await rinkebyWeb3.eth.getGasPrice();
        //   nonce = await rinkebyWeb3.eth.getTransactionCount(adminAddress);
        //   const data = tx.encodeABI();

        //   txData = {
        //     from: adminAddress,
        //     to: rinkebyContract.options.address,
        //     data: data,
        //     gas: 800000,
        //     gasPrice,
        //     nonce,
        //     chain: 'rinkeby',
        //     hardfork: 'london',
        //   }
        //   receipt = await rinkebyWeb3.eth.sendTransaction(txData);

        // }

        console.log(`Transaction hash: ${receipt.transactionHash}`);
        const updateProduct = await prisma.product.update({
          where: {
            id: product?.id
          },
          data: {
            editionMinted: product?.editionMinted ? product?.editionMinted + 1 : 1
          }
        })
        // const updatedOrder = await prisma.order.update({
        //   where: {
        //     id: orderedProduct.order.id
        //   },
        //   data: {
        //     transactionHash: receipt.transactionHash,
        //     orderStatus: 'completed'
        //   }
        // })
        const updatedOrderedProduct = await prisma.orderedProduct.update({
          where: {
            id: orderedProduct.id
          },
          data: {
            minted: true,
            transactionHash: receipt.transactionHash,
            walletAddress
          }
        })
        return { orderedProduct: updatedOrderedProduct }
      },
    })

    t.field('adminMintNft', {
      type: 'Order',
      args: {
        orderId: nonNull('String'),
      },
      resolve: async (_, { orderId }, { prisma, userId, permission, utils }) => {
        // if (!permission?.admin || !permission[permission?.admin]) {
        //   throw new Error('Need either project or admin id in permission');
        // }

        const order = await prisma.order.findUnique({
          where: {
            id: orderId
          },
          include: {
            website: true,
            customer: true,
            orderedProducts: {
              include: {
                product: true
              }
            }
          }
        })
        const customer = order?.customer;
        const product = order?.orderedProducts?.[0]?.product

        const privateKey = 'de6cd64fcf62552a35cbfef46fafaf2dbe503ece34cf7cc9d9e9c0e7958cf159';
        const adminAddress = '0x2344BD69D8e10CeEb80675e300ff384C54277910';

        const rinkebyWeb3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/qh13neqK8r6SKEmGplnnNWl-lYYMx2G4');
        const polygonWeb3 = new Web3('https://eth-polygon.g.alchemy.com/v2/eVvcSQDMlnGLArRQ2WYbEjBf1tlCJaH1');

        const rinkebyNetworkId = await rinkebyWeb3.eth.net.getId();
        const polygonNetworkId = await polygonWeb3.eth.net.getId();

        const rinkebyContract = new rinkebyWeb3.eth.Contract(createdDropAbi.abi, product.editionAddress);
        const polygonContract = new polygonWeb3.eth.Contract(createdDropAbi.abi, product.editionAddress);

        rinkebyWeb3.eth.accounts.wallet.add(privateKey);
        polygonWeb3.eth.accounts.wallet.add(privateKey);

        let tx, gasPrice, nonce, txData, receipt;
        if (order?.website?.chain?.name === 'Polygon') {
          tx = polygonContract.methods.adminMint(order.walletAddress, 1);
          gasPrice = await polygonWeb3.eth.getGasPrice();
          nonce = await polygonWeb3.eth.getTransactionCount(adminAddress);
          const data = tx.encodeABI();

          txData = {
            from: adminAddress,
            to: polygonContract.options.address,
            data: data,
            gas: 800000,
            gasPrice,
            nonce,
            chain: 'polygon',
            hardfork: 'london',
          }
          receipt = await polygonWeb3.eth.sendTransaction(txData);

        } else {
          tx = rinkebyContract.methods.adminMint(order.walletAddress, 1);
          gasPrice = await rinkebyWeb3.eth.getGasPrice();
          nonce = await rinkebyWeb3.eth.getTransactionCount(adminAddress);
          const data = tx.encodeABI();

          txData = {
            from: adminAddress,
            to: rinkebyContract.options.address,
            data: data,
            gas: 800000,
            gasPrice,
            nonce,
            chain: 'rinkeby',
            hardfork: 'london',
          }
          receipt = await rinkebyWeb3.eth.sendTransaction(txData);

        }

        console.log(`Transaction hash: ${receipt.transactionHash}`);
        const updateProduct = await prisma.product.update({
          where: {
            id: product?.id
          },
          data: {
            editionMinted: product?.editionMinted ? product?.editionMinted + 1 : 1
          }
        })
        const updatedOrder = await prisma.order.update({
          where: {
            id: orderId
          },
          data: {
            transactionHash: receipt.transactionHash,
            // orderStatus: 'completed'
          }
        })
        return updatedOrder
      },
    })
  },
})
