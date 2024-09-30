import * as yup from 'yup';
const yupSchema = yup.object().shape({
  categories: yup.mixed().nullable(true),

  collections: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  hiddenMessage: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  orderedLinks: yup.mixed().nullable(true),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  url: yup
    .string()
    .required('validation-required')

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),
});
export default yupSchema;
