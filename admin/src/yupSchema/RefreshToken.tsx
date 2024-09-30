import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  expires: yup.date().nullable(true),

  geo: yup.string().nullable(true),

  ip: yup.string().nullable(true),

  lastActive: yup.date().nullable(true),

  loginTokenId: yup.string().required('validation-required'),

  updatedAt: yup.date().nullable(true),

  user: yup.mixed().nullable(true),

  userAgent: yup.string().nullable(true),

  userAgentRaw: yup.string().nullable(true),

  userId: yup.string().nullable(true),

  value: yup.string().nullable(true),
});
export default yupSchema;
