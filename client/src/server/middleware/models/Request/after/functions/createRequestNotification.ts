const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import sgMail from '@sendgrid/mail';
import sendRequestEmail from '../../../../../magic/utils/emailTemplates/sendRequest';
import receiveRequestEmail from '../../../../../magic/utils/emailTemplates/receiveRequest';

import { useLocale } from '../../../../../../utils/mailLocales';


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createRequestNotification = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;

      const request = await prisma.request.findUnique({
        where: {
          id: params?.result?.id
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

      const sendRequestEmailHtml = sendRequestEmail(context?.domain, request, translator);


      const customerEmailConfig = {
        to: request.customer.email,
        from: {
          email: process.env.EMAIL_FROM,
          name: process.env.EMAIL_FROMNAME,
        },
        subject: translator['WebsiteAdmin.Mail.NewRequest.sent'],
        html: sendRequestEmailHtml
      };
      await sgMail.send(customerEmailConfig)

      const receiveRequestEmailHtml = receiveRequestEmail(context?.domain, request, translator);

      const websiteEmailConfig = {
        to: request.page.website.user.email,
        from: {
          email: process.env.EMAIL_FROM,
          name: process.env.EMAIL_FROMNAME,
        },
        subject: translator['WebsiteAdmin.Mail.NewRequest.received'],
        html: receiveRequestEmailHtml
      };
      await sgMail.send(websiteEmailConfig)
      console.log(translator['WebsiteAdmin.Notification.request'], request.name, translator['WebsiteAdmin.Notification.created'], `${translator['WebsiteAdmin.Notification.request']} ${request.name} ${translator['WebsiteAdmin.Notification.created']}`)
      const notification = await prisma.notification.create({
        data: {
          model: 'Request',
          modelId: request.id,
          title: translator['WebsiteAdmin.Notification.request'],
          description: `${translator['WebsiteAdmin.Notification.request']} ${request.name} ${translator['WebsiteAdmin.Notification.created']}`,
          // title: 'Request',
          // description: `Request ${request.name} created by ${request.customer.email}`,
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

      return { data: true };
    } catch (error) {
      return { error };
    }
  },
};

export default createRequestNotification;
