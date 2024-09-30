import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  amountOff: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  couponType: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  events: yup.mixed().nullable(true),

  expiredAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  orders: yup.mixed().nullable(true),

  percentOff: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  products: yup.mixed().nullable(true),

  quantity: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  slug: yup.string().nullable(true),

  startAt: yup.date().nullable(true),

  updatedAt: yup.date().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
