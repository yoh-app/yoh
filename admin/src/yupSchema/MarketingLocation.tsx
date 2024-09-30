import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  events: yup.mixed().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  locationAddress: yup.string().nullable(true),

  locationLat: yup.mixed().nullable(true),

  locationLng: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  products: yup.mixed().nullable(true),

  updatedAt: yup.date().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
