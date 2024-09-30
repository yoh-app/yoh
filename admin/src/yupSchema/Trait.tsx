import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  product: yup.mixed().nullable(true),

  productId: yup.string().nullable(true),

  values: yup.mixed().nullable(true),
});
export default yupSchema;
