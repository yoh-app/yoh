// import { S3, Endpoint } from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../server/context/prisma';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  try {
    // const userId = getUserId(req);
    if (req?.query?.id) {
      const request = await prisma.request.findUnique({
        where: {
          id: req?.query?.id,
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
                  currency: request?.page?.website?.currencyCode || 'usd',
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
              application_fee_amount: Math.ceil(request.price * 100 * 0.02),
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
                ? `https://${request.page.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
                : `http://www.awkns.local:3003/`,
            cancel_url:
              process.env.NODE_ENV === 'production'
                ? `https://${request.page.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
                : `http://www.awkns.local:3003/`,
          },
          {
            stripeAccount: request?.page.website?.stripeAccountId,
          },
        )
        return res.status(302).redirect(session.url);
      }
    }
    return res.status(302).redirect(process.env.NEXT_PUBLIC_DOMAIN);

    // res.status(200).redirect(process.env.NEXT_PUBLIC_DOMAIN)
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
}
