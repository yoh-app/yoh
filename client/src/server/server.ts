import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { schema } from './nexusSchema';
import { createContext } from './context';
import { beforeHooks, afterHooks } from './middleware';
import { applyMiddleware } from 'graphql-middleware';
import requireContext from './utils/requireContext';
import path from 'path';
import http from 'http';
import Stripe from 'stripe';
import env from 'dotenv';
import sgMail from '@sendgrid/mail';
import prisma from './context/prisma';
import asyncRedis from 'async-redis'
import { updateWebsiteCache } from './utils/cache'
import sendOrderEmail from './magic/utils/emailTemplates/sendOrder';
import receiveOrderEmail from './magic/utils/emailTemplates/receiveOrder';

import { useLocale } from '../utils/mailLocales';
import bodyParser from 'body-parser'
import cronjob from 'node-cron';

import SingleEditionMintableCreator_ADDRESS_POLYGON from '../contractsData/polygon-SingleEditionMintableCreator-address.json'
import SingleEditionMintableCreator_ABI from '../contractsData/polygon-SingleEditionMintableCreator.json'

import SingleEditionMintable_ABI from '../contractsData/polygon-SingleEditionMintable.json'


import Payment_ADDRESS_POLYGON from '../contractsData/polygon-Payments-address.json'
import Payment_ABI from '../contractsData/polygon-Payments.json'

import paidRequestReceiptEmail from './magic/utils/emailTemplates/paidRequestReceipt';
import paidRequestEmail from './magic/utils/emailTemplates/paidRequest';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { Network, Alchemy } from "alchemy-sdk";

// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return yesterday
}

const requestPaidCron = () => {

  const scheduledJobFunction = cronjob.schedule("*/40 * * * * *", async () => {

    const processingRequest = await prisma.request.findMany({
      where: {
        requestStatus: {
          equals: 'processing'
        },
        page: {
          website: {
            paymentMethod: 'crypto'
          }
        },
      },
      include: {
        page: {
          include: {
            website: {
              include: {
                user: true
              }
            }
          }
        },
        customer: {
          include: {
            user: true
          }
        }
      }
    })
    if (processingRequest?.length > 0) {
      // Get logs for a certain address, with specified topics and blockHash
      const logs = await alchemy.core
        .getLogs({
          address: Payment_ADDRESS_POLYGON.address,
          fromBlock: 'earliest',
          toBlock: 'latest'
        })

      const abiDecoder = require('abi-decoder');
      abiDecoder.addABI(Payment_ABI.abi);

      logs.map(async (log) => {
        // console.log(log, 'log')
        const decodedLogs = abiDecoder.decodeLogs([log]);
        console.log(decodedLogs, 'decodedLogs')

        decodedLogs.map(async (decodedLog) => {
          if (decodedLog.name === 'PaidRequest') {
            const requestId = decodedLog.events.find(
              (event) => event.name === 'requestId'
            );
            const buyer = decodedLog.events.find(
              (event) => event.name === 'buyer'
            );
            if (requestId?.value && buyer?.value) {
              const request = processingRequest?.find((_request) => {
                return requestId?.value === _request?.id
              })
              if (request?.id && request?.requestStatus === 'processing') {
                const expiredDate = new Date(Date.now() + request.days * 24 * 60 * 60 * 1000);

                const updateRequest = await prisma.request.update({
                  where: {
                    id: request.id
                  },
                  data: {
                    walletAddress: { set: buyer.value },
                    requestStatus: { set: 'active' },
                    transactionHash: log.transactionHash,
                    expiredAt: { set: expiredDate.toISOString() },
                    paidAt: { set: new Date().toISOString() },
                  },
                })

                const translator = useLocale(request.page.website.languageCode);

                const paidRequestEmailHtml = paidRequestEmail(request, translator);

                const emailConfig = {
                  to: request.page?.website?.user?.email,
                  from: {
                    email: process.env.EMAIL_FROM,
                    name: process.env.EMAIL_FROMNAME,
                  },
                  subject: translator['WebsiteAdmin.Mail.NewRequest.paid'],
                  html: paidRequestEmailHtml
                };
                await sgMail.send(emailConfig)


                const paidRequestReceiptEmailHtml = paidRequestReceiptEmail(request, translator);

                const emailReceiptConfig = {
                  to: request.customer?.user?.email,
                  from: {
                    email: process.env.EMAIL_FROM,
                    name: process.env.EMAIL_FROMNAME,
                  },
                  subject: translator['WebsiteAdmin.Mail.NewRequest.paid.receipt'],
                  html: paidRequestReceiptEmailHtml
                };
                await sgMail.send(emailReceiptConfig)
                console.log(request.page?.website, translator['WebsiteAdmin.Notification.request'], translator['WebsiteAdmin.Notification.paid'])
                const notification = await prisma.notification.create({
                  data: {
                    model: 'Request',
                    modelId: request.id,
                    title: translator['WebsiteAdmin.Notification.request'],
                    description: `${translator['WebsiteAdmin.Notification.request']} ${request.name} ${translator['WebsiteAdmin.Notification.paid']}`,
                    url: `/admin/Website/Website/Request?view=${request.id}`,
                    action: 'view',
                    isUnRead: true,
                    website: {
                      connect: {
                        id: request.page.website.id
                      }
                    }
                  }
                })
              }
            }
          }
        })
      })
    }

  });
  scheduledJobFunction.start()

}

const productAddressCron = () => {

  const scheduledJobFunction = cronjob.schedule("*/40 * * * * *", async () => {

    const products = await prisma.product.findMany({
      where: {
        transactionHash: {
          not: {
            equals: null
          }
        },
        editionAddress: {
          equals: null
        }
      }
    })
    if (products?.length > 0) {
      // Get logs for a certain address, with specified topics and blockHash
      const logs = await alchemy.core
        .getLogs({
          address: SingleEditionMintableCreator_ADDRESS_POLYGON.address,
          fromBlock: 'earliest',
          toBlock: 'latest'
        })
      const abiDecoder = require('abi-decoder');
      abiDecoder.addABI(SingleEditionMintableCreator_ABI.abi);

      logs.map(async (log) => {
        // console.log(log, 'log')
        const decodedLogs = abiDecoder.decodeLogs([log]);
        console.log(JSON.stringify(decodedLogs), 'decodedLogs')

        decodedLogs.map(async (decodedLog) => {
          if (decodedLog.name === 'CreatedEdition') {
            const editionContractAddressEvent = decodedLog.events.find(
              (event) => event.name === 'editionContractAddress'
            );
            const product = products.find((product) => product.transactionHash === log.transactionHash)

            if (editionContractAddressEvent?.value && product?.id) {
              const updateProduct = await prisma.product.update({
                where: {
                  id: product?.id,
                },
                data: {
                  editionAddress: editionContractAddressEvent.value,
                },
              });
              console.log(updateProduct, 'product updated', updateProduct.id, updateProduct.slug)
            }
          }
        })
      })
    }
  });
  scheduledJobFunction.start()

}

const orderCron = () => {
  const scheduledJobFunction = cronjob.schedule("*/40 * * * * *", async () => {
    const orders = await prisma.order.findMany({
      where: {
        orderStatus: {
          equals: 'processing'
        },
        transactionHash: {
          not: {
            equals: null
          }
        }
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
    orders.map(async (order) => {
      const orderTransactionReceipt = await alchemy.core
        .getTransactionReceipt(
          order.transactionHash
        )
      if (orderTransactionReceipt) {
        const updateOrderedProduct = await prisma.orderedProduct.update({
          where: {
            id: order?.orderedProducts?.[0]?.id
          },
          data: {
            minted: true,
            transactionHash: order.transactionHash
            // editionMinted: product?.editionMinted ? product?.editionMinted + 1 : 1
          }
        })

        const updatedOrder = await prisma.order.update({
          where: {
            id: order?.id
          },
          data: {
            orderStatus: 'completed'
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
            title: translator['WebsiteAdmin.Notification.order'],
            description: `${translator['WebsiteAdmin.Notification.order']} ${updateOrderedProduct.name} ${translator['WebsiteAdmin.Notification.paid']}`,
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
      }
    })
  });

}

const requestCompleteCron = () => {
  const scheduledJobFunction = cronjob.schedule("* */30 * * * *", async () => {
    const requests = await prisma.request.findMany({
      where: {
        requestStatus: {
          equals: 'active'
        }
      }
    })
    const completedRequests = []
    requests.forEach((request) => {
      if (request?.requestStatus === 'active' && request?.expiredAt) {
        const expiredAt = new Date(request?.expiredAt).getTime()
        const now = new Date().getTime()
        console.log(expiredAt, now, request?.expiredAt, new Date(), request.id)
        if (expiredAt < now) {
          completedRequests.push(request)
        }
      }
    })
    if (completedRequests?.length > 0) {
      const updateRequests = await prisma.request.updateMany({
        where: {
          id: {
            in: completedRequests.map((request) => request.id)
          }
        },
        data: {
          requestStatus: 'completed'
        }
      })
      console.log(updateRequests, 'requests updated')
    }
  });


  scheduledJobFunction.start();
}

const pingAdminCron = () => {
  const scheduledJobFunction = cronjob.schedule("*/50 * * * * *", async () => {
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/User/Website/Website`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Page`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/PageCollection`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/ProductCollection`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Analytics`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Order`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Request`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Product`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Link`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Document`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Picture`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Audio`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Video`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Customer`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/NftOverview`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/Onboard`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website/Website/DesignPage`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/User`).catch((err) => console.log(err))
    fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/notifications`).catch((err) => console.log(err))
  });
  scheduledJobFunction.start();
}
if (process.env.NODE_ENV === 'production') {
  pingAdminCron()
}
// orderCron()
// requestPaidCron()
// requestCompleteCron()
// productAddressCron()
const redisClient = asyncRedis.createClient({
  url: process.env.REDIS_URL,
})
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;


const middlewares = {};
const middlewareContext = requireContext(path.resolve('src/server/middleware'), true, /\.ts$/);
Object.keys(middlewareContext).forEach((key) => {
  middlewares[key] = middlewareContext[key].default;
});

// const templates = [];
// const templateFiles = requireContext(path.resolve('src/templates'), true, /\.ts$/);
// Object.keys(templateFiles).forEach((key) => {
//   templates.push(templateFiles[key].default);
// });

const server = new ApolloServer({
  schema: applyMiddleware(schema, beforeHooks, afterHooks),
  context: async ({ req, res }) => createContext({ req, res, middlewares }),
});

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  app.get('/health-check', (req, res) => {
    res.send('healthy!')
  });
  app.post(
    '/webhook',
    // Stripe requires the raw body to construct the event
    bodyParser.raw({ type: 'application/json' }),
    async (req: express.Request, res: express.Response): void => {
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
        if (session.metadata.type === 'order') {

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
          // const existOrder = await prisma.order.findUnique({
          //   where: {
          //     id: session.metadata.orderId,
          //   },
          //   include: {
          //     orderedProducts: true,
          //     website: {
          //       include: {
          //         user: true,
          //       }
          //     },
          //     customer: true,
          //   },
          // });
          console.log(session, 'session', order.website.stripeAccountId)
          const stripeCustomer = await stripe.customers.retrieve(session.customer, { stripeAccount: order.website.stripeAccountId })
          console.log(stripeCustomer, 'stripe customer')
          const customer = await prisma.customer.update({
            where: {
              id: order?.customer?.id
            },
            data: {
              name: stripeCustomer.name
            }
          })


          // if (!permission?.admin || !permission[permission?.admin]) {
          //   throw new Error('Need either project or admin id in permission');
          // }

          const product = order?.orderedProducts?.[0]?.product

          const updatedOrder = await prisma.order.update({
            where: {
              id: session.metadata.orderId,
            },
            data: {
              orderStatus: 'completed'
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

        } else if (session.metadata.type === 'request') {
          const requestItem = await prisma.request.findUnique({
            where: {
              id: session.metadata.requestId,
            },
          })
          const expiredDate = new Date(Date.now() + requestItem.days * 24 * 60 * 60 * 1000);
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
                  id: request.page.website.id
                }
              }
            }
          })
          await updateWebsiteCache({ websiteId: request?.page?.website?.id, prisma, redisClient })
        }
        console.log(`💰 Session: ${JSON.stringify(session)}`);
      } else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      res.json({ received: true });
    }
  );
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: (origin, callback) => {
        console.log('origin', origin)
        if (!origin) {
          callback(null, true);
        } else if (origin?.includes('yohnft.com') || origin?.includes('awkns.local') || origin?.includes('yoh.app') || origin?.includes('pixite.io') || origin?.includes('awkns.local') || origin?.includes('pixite.app')) {
          callback(null, origin);
        }
      }, // <- allow request from all domains
      credentials: true,
    },
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  });

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT || 3002 }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3002}${server.graphqlPath}`);
}
startApolloServer();
