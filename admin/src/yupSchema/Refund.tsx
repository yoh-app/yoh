import * as yup from 'yup';
const yupSchema = yup.object().shape({
  accept: yup.boolean().nullable(true),

  amount: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  createdAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  order: yup.mixed().nullable(true),

  orderId: yup.string().nullable(true),

  orderedProducts: yup.mixed().nullable(true),

  received: yup.boolean().nullable(true),

  shippingImages: yup.mixed().nullable(true),
});
export default yupSchema;
