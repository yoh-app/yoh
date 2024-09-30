import * as yup from 'yup';
const yupSchema = yup.object().shape({
  collectionStyle: yup.string().nullable(true),

  collectionType: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  displayTitle: yup.boolean().nullable(true),

  id: yup.string().nullable(true),

  items: yup.mixed().nullable(true),

  links: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  pages: yup.mixed().nullable(true),

  products: yup.mixed().nullable(true),

  requests: yup.mixed().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
