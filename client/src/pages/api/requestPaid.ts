import prisma from 'admin/src/server/context/prisma'
import paidRequestEmail from '@server/magic/utils/emailTemplates/paidRequest';

import { useLocale } from 'admin/src/utils/mailLocales';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function requestPaid(req, res) {
  const { requestId, transactionHash, walletAddress } = req.body
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? req?.headers?.origin.replace('https://', '').replace('http://', '')?.split(':')[0].split('.').slice(1).join('.')

  const requestItem = await prisma.request.findUnique({
    where: {
      id: requestId,
    },
    include: {
      customer: true
    }
  })
  const customer = await prisma.customer.update({
    where: {
      id: requestItem?.customer?.id
    },
    data: {
      walletAddress
    }
  })
  const expiredDate = new Date(Date.now() + requestItem.days * 24 * 60 * 60 * 1000);

  const request = await prisma.request.update({
    where: {
      id: requestId
    },
    data: {
      walletAddress: { set: walletAddress },
      requestStatus: { set: 'active' },
      transactionHash,
      expiredAt: { set: expiredDate.toISOString() },
      paidAt: { set: new Date().toISOString() },
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

  const translator = useLocale(request.page.website.languageCode);

  const paidRequestEmailHtml = paidRequestEmail(domain, request, translator);

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

  res.send(200)
}