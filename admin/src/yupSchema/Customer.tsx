import * as yup from 'yup';
const yupSchema = yup.object().shape({
  affiliate: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  email: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  note: yup.string().nullable(true),

  orders: yup.mixed().nullable(true),

  requests: yup.mixed().nullable(true),

  updatedAt: yup.date().nullable(true),

  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),

  walletAddress: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
