import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  tags: yup.mixed().nullable(true),
});
export default yupSchema;
