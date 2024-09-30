import type { MailDataRequired } from '@sendgrid/mail';

import cronjob from 'node-cron';
import { Network, Alchemy } from "alchemy-sdk";
import sgMail from '@sendgrid/mail';

import prisma from '../context/prisma';

import { useLocale } from '../../utils/mailLocales';
import sendOrderEmail from '../magic/utils/emailTemplates/sendOrder';
import receiveOrderEmail from '../magic/utils/emailTemplates/receiveOrder';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ARB_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const orderCron = async ({ res }) => {
  const orders = await prisma.order.findMany({
    where: {
      paid: {
        equals: true
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
        order.transactionHash || ''
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
          completed: true
        }
      })

      const translator = useLocale(order.website?.languageCode || '');

      if (order?.customer?.email || order?.customer?.user?.email) {
        const email = order?.customer?.email || order?.customer?.user?.email || ''
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
        to: order.website?.user?.email,
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
          modelId: order.id,
          title: translator['WebsiteAdmin.Notification.order'],
          description: `${translator['WebsiteAdmin.Notification.order']} ${updateOrderedProduct.name} ${translator['WebsiteAdmin.Notification.paid']}`,
          url: `/admin/Organization/Organization/Order?view=${order.id}`,
          action: 'view',
          isUnRead: true,
          website: {
            connect: {
              id: order.website?.id
            }
          }
        }
      })
    }
  })
  res?.status(200).end('orderCron');

}
// cronjob.schedule("*/40 * * * * *", orderCron);


export default orderCron;