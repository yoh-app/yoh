import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../server/context/prisma';
// import { cleanCache } from '../../../server/utils/cache';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id);

    // Cast event data to Stripe object.
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(paymentIntent);

      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log(charge);
      console.log(`💵 Charge id: ${charge.id}`);
    } else if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata.type === 'order') {
        const existOrder = await prisma.order.findUnique({
          where: {
            id: session.metadata.orderId,
          },
          include: {
            orderedProducts: true,
          },
        });
        const order = await prisma.order.update({
          where: {
            id: session.metadata.orderId,
          },
          data: {
            shipping_address: session?.shipping?.address,
            orderStatus: existOrder?.orderedProducts?.find((orderedProduct) => orderedProduct.productType !== 'digital')
              ? 'processing'
              : 'completed',
            sales_tax: session?.total_details?.amount_tax ? session?.total_details?.amount_tax / 100 : 0,
            total: session.amount_total ? session.amount_total / 100 : 0,
            paid_total: session.amount_total ? session.amount_total / 100 : 0,
            discount: session?.total_details?.amount_discount ? session?.total_details?.amount_discount / 100 : 0,
          },
          include: {
            website: {
              include: {
                user: true,
              }
            },
            customer: {
              include: {
                user: this,
              }
            },
            orderedProducts: {
              include: {
                product: true,
              },
            },
          },
        });

        await Promise.all(
          order.orderedProducts.map(async (orderedProduct) => {
            if (orderedProduct.productType === 'simple') {
              const product = await prisma.product.findUnique({
                where: {
                  id: orderedProduct?.product.id,
                },
              });
              const updateProduct = await prisma.product.update({
                where: {
                  id: orderedProduct?.product?.id,
                },
                data: {
                  quantity: product.quantity - orderedProduct.quantity,
                },
              });
            } else if (orderedProduct.productType === 'variable') {
              const product = await prisma.product.findUnique({
                where: {
                  id: orderedProduct?.product.id,
                },
              });
              const variation_options = product?.variation_options.map((variation_option) => {
                if (variation_option.id === orderedProduct.variationId) {
                  return {
                    ...variation_option,
                    quantity: variation_option.quantity - orderedProduct.quantity,
                  };
                }
                return variation_option;
              });
              const updateProduct = await prisma.product.update({
                where: {
                  id: orderedProduct?.product?.id,
                },
                data: {
                  variation_options,
                },
              });
            }
          }),
        );
        // cleanCache({ websiteId: order.website.id, prisma });
        const customerEmailConfig = {
          to: order.customer.email,
          from: {
            email: process.env.EMAIL_FROM,
            name: process.env.EMAIL_FROMNAME,
          },
          subject: `order ${order.id}`,
          html: `<a href="${process.env.PROTOCOL}://${order.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}">Visit</a>`,
        };
        await sgMail.send(customerEmailConfig)
        const customerNotification = await prisma.notification.create({
          data: {
            model: 'Order',
            modelId: order.id,
            title: 'Order',
            description: `Order ${order.id} paid`,
            url: `/admin/User/Order/Order?view=${order.id}`,
            action: 'view',
            isUnRead: true,
            user: {
              connect: {
                id: order.customer.user.id
              }
            }
          }
        })
        const websiteEmailConfig = {
          to: order.website.user.email,
          from: {
            email: process.env.EMAIL_FROM,
            name: process.env.EMAIL_FROMNAME,
          },
          subject: `order ${order.id}`,
          html: `<a href="${process.env.PROTOCOL}://${order.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}">Visit</a>`,
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
      } else if (session.metadata.type === 'request') {
        const request = await prisma.request.update({
          where: {
            id: session.metadata.requestId,
          },
          data: {
            paid: true,
          },
          include: {
            page: {
              include: {
                website: true,
              },
            },
          },
        });
        // cleanCache({ websiteId: request.page.website.id, prisma });
      }
      console.log(`💰 Session: ${JSON.stringify(session)}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler as any);
