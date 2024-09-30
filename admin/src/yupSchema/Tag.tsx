import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  icon: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  type: yup.mixed().nullable(true),

  typeId: yup.string().nullable(true),
});
export default yupSchema;
