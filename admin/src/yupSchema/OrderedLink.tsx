import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  hiddenMessage: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  link: yup.mixed().nullable(true),

  linkId: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  orderedProduct: yup.mixed().nullable(true),

  orderedProductId: yup.string().nullable(true),

  url: yup
    .string()
    .required('validation-required')

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
});
export default yupSchema;
