import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  content: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  externalUrl: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  isExternalLink: yup.boolean().nullable(true),

  isIndex: yup.boolean().nullable(true),

  menu: yup.boolean().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  navColor: yup.string().nullable(true),

  pageCollections: yup.mixed().nullable(true),

  pageViews: yup.mixed().nullable(true),

  password: yup.string().nullable(true),

  products: yup.mixed().nullable(true),

  requestClicks: yup.mixed().nullable(true),

  requests: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
