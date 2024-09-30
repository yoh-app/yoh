import * as yup from 'yup';
const yupSchema = yup.object().shape({
  action: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  isUnRead: yup.boolean().nullable(true),

  message: yup.string().nullable(true),

  model: yup.string().nullable(true),

  modelId: yup.string().nullable(true),

  title: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

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
