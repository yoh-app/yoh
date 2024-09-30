import * as yup from 'yup';
const yupSchema = yup.object().shape({
  accept: yup.boolean().nullable(true),

  acceptBefore: yup.date().nullable(true),

  active: yup.boolean().nullable(true),

  applicationFee: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  audio: yup.mixed().nullable(true),

  audioId: yup.string().nullable(true),

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

  page: yup.mixed().nullable(true),

  pageId: yup.string().nullable(true),

  paid: yup.boolean().nullable(true),

  paidAt: yup.date().nullable(true),

  paymentId: yup.string().nullable(true),

  paymentType: yup.string().nullable(true),

  price: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  requestClicks: yup.mixed().nullable(true),

  requestStatus: yup.string().nullable(true),

  stripeFee: yup.number().min(0, 'validation-num-gte-0').nullable(true),

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
  useUsd: yup.boolean().nullable(true),

  video: yup.mixed().nullable(true),

  videoId: yup.string().nullable(true),

  walletAddress: yup.string().nullable(true),
});
export default yupSchema;
