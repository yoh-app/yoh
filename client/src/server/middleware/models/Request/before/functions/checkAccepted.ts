const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import sgMail from '@sendgrid/mail';
import approveRequestEmail from '../../../../../magic/utils/emailTemplates/approveRequest';

import { useLocale } from '../../../../../../utils/mailLocales';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const checkAccepted = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;

      const request = await prisma.request.findUnique({
        where: {
          id: args?.where?.id
        },
        include: {
          page: {
            include: {
              website: true
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

      const approveRequestEmailHtml = approveRequestEmail(request, translator);

      if (request?.requestStatus === 'pending' && args?.data?.requestStatus?.set === 'processing') {
        const emailConfig = {
          to: request.customer.email,
          from: {
            email: process.env.EMAIL_FROM,
            name: process.env.EMAIL_FROMNAME,
          },
          subject: translator['WebsiteAdmin.Mail.NewRequest.approved'],
          html: approveRequestEmailHtml
        };
        await sgMail.send(emailConfig)
        const notification = await prisma.notification.create({
          data: {
            model: 'Request',
            modelId: request.id,
            title: 'Request',
            description: `Request ${request.name} accepted`,
            url: `/admin/User/Request/Request?view=${request.id}`,
            action: 'view',
            isUnRead: true,
            user: {
              connect: {
                id: request.customer.user.id
              }
            }
          }
        })
      }

      return { data: true };
    } catch (error) {
      return { error };
    }
  },
};

export default checkAccepted;
