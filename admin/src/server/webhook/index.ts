import type { Express, Request, Response } from 'express';
import type { MailDataRequired } from '@sendgrid/mail';

import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';
// import asyncRedis from 'async-redis';
import bodyParser from 'body-parser';

import prisma from '../context/prisma';

import sendOrderEmail from '../magic/utils/emailTemplates/sendOrder';
import receiveOrderEmail from '../magic/utils/emailTemplates/receiveOrder';
import { useLocale } from '../../utils/mailLocales';
import { updateWebsiteCache } from './../utils/cache'
import { createClient } from '@vercel/kv'
const kvClient = createClient({
  url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
  token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
});

// const redisClient = asyncRedis.createClient({
//   url: process.env.REDIS_URL,
// })
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});
const webhookSecret: string | undefined = process.env.STRIPE_WEBHOOK_SECRET;

const webhookRegister = (app: Express) => {
  app.post(
    '/webhook',
    // Stripe requires the raw body to construct the event
    bodyParser.raw({ type: 'application/json' }),
    async (req: Request, res: Response) => {
      const sig = req.headers['stripe-signature'];

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Successfully constructed event
      console.log('✅ Success:', event.id);

      // Cast event data to Stripe object
      if (event.type === 'payment_intent.succeeded') {
        const stripeObject: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
      } else if (event.type === 'charge.succeeded') {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);
      } else if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.type === 'order') {

          const order = await prisma.order.findUnique({
            where: {
              id: session.metadata.orderId,
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
          console.log(session, 'session', order?.website?.stripeAccountId)
          const stripeCustomer = await stripe.customers.retrieve(session.customer, { stripeAccount: order?.website?.stripeAccountId })
          console.log(stripeCustomer, 'stripe customer')
          const customer = await prisma.customer.update({
            where: {
              id: order?.customer?.id
            },
            data: {
              name: stripeCustomer.name
            }
          })

          const product = order?.orderedProducts?.[0]?.product

          const updatedOrder = await prisma.order.update({
            where: {
              id: session.metadata.orderId,
            },
            data: {
              paid: true
              // orderStatus: 'completed'
            }
          })

          const translator = useLocale(order?.website?.languageCode || '');

          if (order?.customer?.email || order?.customer?.user?.email) {
            const email = order?.customer?.email || order?.customer?.user?.email
            const sendOrderEmailHtml = sendOrderEmail(order, translator);

            // cleanCache({ websiteId: order.website.id, prisma });
            const customerEmailConfig: MailDataRequired = {
              to: email,
              from: {
                email: process.env.EMAIL_FROM || '',
                name: process.env.EMAIL_FROMNAME,
              },
              subject: translator['WebsiteAdmin.Mail.Order.placed'],
              html: sendOrderEmailHtml,
            };
            await sgMail.send(customerEmailConfig)
          }

          const receiveOrderEmailHtml = receiveOrderEmail(order, translator);

          const websiteEmailConfig: MailDataRequired = {
            to: order?.website?.user?.email,
            from: {
              email: process.env.EMAIL_FROM || '',
              name: process.env.EMAIL_FROMNAME,
            },
            subject: translator['WebsiteAdmin.Mail.Order.sold'],
            html: receiveOrderEmailHtml,
          };
          await sgMail.send(websiteEmailConfig)
          const websiteNotification = await prisma.notification.create({
            data: {
              model: 'Order',
              modelId: order?.id,
              title: 'Order',
              description: `Order ${order?.id} paid`,
              url: `/admin/Website/Website/Order?view=${order?.id}`,
              action: 'view',
              isUnRead: true,
              website: {
                connect: {
                  id: order?.website?.id
                }
              }
            }
          })

        } else if (session.metadata?.type === 'request') {
          const requestItem = await prisma.request.findUnique({
            where: {
              id: session.metadata.requestId,
            },
          })
          const expiredDate = new Date(Date.now() + (requestItem?.days ? requestItem.days : 0) * 24 * 60 * 60 * 1000);
          const request = await prisma.request.update({
            where: {
              id: session.metadata.requestId,
            },
            data: {
              requestStatus: { set: 'active' },
              paidAt: { set: new Date().toISOString() },
              expiredAt: { set: expiredDate.toISOString() }
            },
            include: {
              page: {
                include: {
                  website: true,
                },
              },
            },
          });
          const notification = await prisma.notification.create({
            data: {
              model: 'Request',
              modelId: request.id,
              title: 'Request',
              description: `Request ${request.name} paid`,
              url: `/admin/Website/Website/Request?view=${request.id}`,
              action: 'view',
              isUnRead: true,
              website: {
                connect: {
                  id: request.page?.website?.id
                }
              }
            }
          })
          await updateWebsiteCache({ websiteId: request?.page?.website?.id, prisma, kvClient })
        }
        console.log(`💰 Session: ${JSON.stringify(session)}`);
      } else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    }
  );
}

export default webhookRegister;