import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  displayTitle: yup.boolean().nullable(true),

  id: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  updatedAt: yup.date().nullable(true),

  videos: yup.mixed().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
