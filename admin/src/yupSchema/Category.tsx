import * as yup from 'yup';
const yupSchema = yup.object().shape({
  children: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  details: yup.string().nullable(true),

  icon: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  links: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  pages: yup.mixed().nullable(true),

  parent: yup.mixed().nullable(true),

  parentId: yup.string().nullable(true),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
