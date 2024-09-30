import * as yup from 'yup';
const yupSchema = yup.object().shape({
  approved: yup.boolean().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  domain: yup.string().nullable(true),

  email: yup.string().nullable(true),

  expires: yup.date().nullable(true),

  geo: yup.string().nullable(true),

  id: yup.string().nullable(true),

  ip: yup.string().nullable(true),

  secret: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  user: yup.mixed().nullable(true),

  userAgent: yup.string().nullable(true),

  userAgentRaw: yup.string().nullable(true),

  userId: yup.string().nullable(true),
});
export default yupSchema;
