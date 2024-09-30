import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  endTime: yup.date().nullable(true),

  event: yup.mixed().nullable(true),

  eventId: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  speakers: yup.mixed().nullable(true),

  startTime: yup.date().nullable(true),

  updatedAt: yup.date().nullable(true),
});
export default yupSchema;
