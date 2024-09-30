import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  event: yup.mixed().nullable(true),

  eventId: yup.string().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  minted: yup.boolean().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  order: yup.mixed().nullable(true),

  orderId: yup.string().nullable(true),

  price: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  product: yup.mixed().nullable(true),

  productId: yup.string().nullable(true),

  productSlug: yup.string().nullable(true),

  productType: yup.string().nullable(true),

  productUrl: yup.string().nullable(true),

  quantity: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  redeemedQuantity: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  slug: yup.string().nullable(true),

  tokenId: yup.string().nullable(true),

  total: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  transactionHash: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  variationId: yup.string().nullable(true),

  variationName: yup.string().nullable(true),

  variationOption: yup.mixed().nullable(true),

  walletAddress: yup.string().nullable(true),
});
export default yupSchema;
