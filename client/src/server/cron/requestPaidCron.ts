import type { MailDataRequired } from '@sendgrid/mail';

import cronjob from 'node-cron';
import { Network, Alchemy } from "alchemy-sdk";
import sgMail from '@sendgrid/mail';

import prisma from '../context/prisma';

import { useLocale } from '../../utils/mailLocales';
import paidRequestEmail from '../magic/utils/emailTemplates/paidRequest';
import paidRequestReceiptEmail from '../magic/utils/emailTemplates/paidRequestReceipt';

import Payment_ADDRESS_POLYGON from '../../contractsData/polygon-Payments-address.json';
import Payment_ABI from '../../contractsData/polygon-Payments.json';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const requestPaidCron = async ({ res }) => {
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
      // console.log(decodedLogs, 'decodedLogs')

      decodedLogs.map(async (decodedLog: any) => {
        if (decodedLog.name === 'PaidRequest') {
          const requestId = decodedLog.events.find(
            (event: any) => event.name === 'requestId'
          );
          const buyer = decodedLog.events.find(
            (event: any) => event.name === 'buyer'
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

              const translator = useLocale(request.page?.website?.languageCode || '');

              const paidRequestEmailHtml = paidRequestEmail(request, translator);

              const emailConfig: MailDataRequired = {
                to: request.page?.website?.user?.email,
                from: {
                  email: process.env.EMAIL_FROM || '',
                  name: process.env.EMAIL_FROMNAME,
                },
                subject: translator['WebsiteAdmin.Mail.NewRequest.paid'],
                html: paidRequestEmailHtml
              };
              await sgMail.send(emailConfig)


              const paidRequestReceiptEmailHtml = paidRequestReceiptEmail(request, translator);

              const emailReceiptConfig: MailDataRequired = {
                to: request.customer?.user?.email,
                from: {
                  email: process.env.EMAIL_FROM || '',
                  name: process.env.EMAIL_FROMNAME,
                },
                subject: translator['WebsiteAdmin.Mail.NewRequest.paid.receipt'],
                html: paidRequestReceiptEmailHtml
              };
              await sgMail.send(emailReceiptConfig)
              // console.log(request.page?.website, translator['WebsiteAdmin.Notification.request'], translator['WebsiteAdmin.Notification.paid'])
              const notification = await prisma.notification.create({
                data: {
                  model: 'Request',
                  modelId: request.id,
                  title: translator['WebsiteAdmin.Notification.request'],
                  description: `${translator['WebsiteAdmin.Notification.request']} ${request.name} ${translator['WebsiteAdmin.Notification.paid']}`,
                  url: `/admin/Organization/Organization/Request?view=${request.id}`,
                  action: 'view',
                  isUnRead: true,
                  website: {
                    connect: {
                      id: request.page?.website?.id
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
  res?.status(200).end('requestPaidCron');

}

// const scheduledJobFunction = cronjob.schedule("*/40 * * * * *", requestPaidCron);


export default requestPaidCron;