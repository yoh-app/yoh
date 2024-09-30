import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  organization: yup.mixed().nullable(true),

  organizationId: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  websites: yup.mixed().nullable(true),
});
export default yupSchema;
