import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  orderedProduct: yup.mixed().nullable(true),

  orderedProductId: yup.string().nullable(true),

  url: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  video: yup.mixed().nullable(true),

  videoId: yup.string().nullable(true),

  videoObj: yup.mixed().nullable(true),
});
export default yupSchema;
