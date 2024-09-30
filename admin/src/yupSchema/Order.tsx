import * as yup from 'yup';
const yupSchema = yup.object().shape({
  affiliateFee: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  affiliateWalletAddress: yup.string().nullable(true),

  affiliateWebsiteSlug: yup.string().nullable(true),

  amount: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  applicationFee: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  completed: yup.boolean().nullable(true),

  coupon: yup.mixed().nullable(true),

  couponId: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  currencyCode: yup.string().nullable(true),

  customer: yup.mixed().nullable(true),

  customerId: yup.string().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  discount: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  id: yup.string().nullable(true),

  isAirdrop: yup.boolean().nullable(true),

  orderedProducts: yup.mixed().nullable(true),

  paid: yup.boolean().nullable(true),

  paymentType: yup.string().nullable(true),

  stripeFee: yup.boolean().nullable(true),

  total: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  transactionHash: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  walletAddress: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
