import * as yup from 'yup';
const yupSchema = yup.object().shape({
  content: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  documentObj: yup.mixed().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  orderedDocuments: yup.mixed().nullable(true),

  paid: yup.boolean().nullable(true),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  transactionHash: yup.string().nullable(true),

  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),

  walletAddress: yup.string().nullable(true),
});
export default yupSchema;
