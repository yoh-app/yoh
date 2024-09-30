import * as yup from 'yup';
const yupSchema = yup.object().shape({
  counter: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  model: yup.string().nullable(true),

  slug: yup.string().nullable(true),

  title: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),
});
export default yupSchema;
