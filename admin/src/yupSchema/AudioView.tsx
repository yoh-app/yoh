import * as yup from 'yup';
const yupSchema = yup.object().shape({
  audio: yup.mixed().nullable(true),

  audioId: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  ip: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),
});
export default yupSchema;
