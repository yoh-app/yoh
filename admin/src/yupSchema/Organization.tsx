import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  eventGroups: yup.mixed().nullable(true),

  id: yup.string().nullable(true),

  logoObj: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  productGroups: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  telegramApiToken: yup.string().nullable(true),

  telegramBotId: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),

  walletAddress: yup.string().nullable(true),

  websiteGroups: yup.mixed().nullable(true),
});
export default yupSchema;
