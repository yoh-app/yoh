import * as yup from 'yup';
const yupSchema = yup.object().shape({
  attachments: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  customers: yup.mixed().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  email: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  loginTokens: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  notifications: yup.mixed().nullable(true),

  organizations: yup.mixed().nullable(true),

  password: yup.string().nullable(true),

  refreshTokens: yup.mixed().nullable(true),

  stripeAccountId: yup.string().nullable(true),

  stripeCustomerId: yup.string().nullable(true),

  telegramUserId: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  websites: yup.mixed().nullable(true),
});
export default yupSchema;
