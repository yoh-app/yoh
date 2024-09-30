import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  orderedProduct: yup.mixed().nullable(true),

  orderedProductId: yup.string().nullable(true),

  perLimit: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  quantity: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  redeemInfo: yup.mixed().nullable(true),

  redeemable: yup.mixed().nullable(true),

  redeemableId: yup.string().nullable(true),

  url: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
});
export default yupSchema;
