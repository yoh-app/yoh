import * as yup from 'yup';
const yupSchema = yup.object().shape({
  Page: yup.mixed().nullable(true),

  accept: yup.boolean().nullable(true),

  acceptBefore: yup.date().nullable(true),

  active: yup.boolean().nullable(true),

  advertisementClicks: yup.mixed().nullable(true),

  advertisementStatus: yup.string().nullable(true),

  applicationFee: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  chain: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  currencyCode: yup.string().nullable(true),

  customer: yup.mixed().nullable(true),

  customerId: yup.string().nullable(true),

  days: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  expiredAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  message: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  pageId: yup.string().nullable(true),

  paid: yup.boolean().nullable(true),

  paidAt: yup.date().nullable(true),

  paymentId: yup.string().nullable(true),

  price: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  subject: yup.string().nullable(true),

  total: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  transactionHash: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  url: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  useUsdc: yup.boolean().nullable(true),

  walletAddress: yup.string().nullable(true),
});
export default yupSchema;
