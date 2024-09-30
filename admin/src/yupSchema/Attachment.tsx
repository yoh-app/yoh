import * as yup from 'yup';
const yupSchema = yup.object().shape({
  attachmentObj: yup.mixed().nullable(true),

  attachmentType: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  event: yup.mixed().nullable(true),

  eventId: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  previewObj: yup.mixed().nullable(true),

  product: yup.mixed().nullable(true),

  productId: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  upload: yup.mixed().nullable(true),

  url: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
