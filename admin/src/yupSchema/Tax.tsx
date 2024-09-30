import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  city: yup.string().nullable(true),

  country: yup.string().nullable(true),

  countryCode: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  currencyCode: yup.string().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  inclusive: yup.boolean().required('validation-required'),

  isGlobal: yup.boolean().nullable(true),

  jurisdiction: yup.string().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  onShipping: yup.boolean().nullable(true),

  percentage: yup.number().min(0, 'validation-num-gte-0').required('validation-required'),

  priority: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  state: yup.string().nullable(true),

  stripePrivateTaxId: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),

  zip: yup.string().nullable(true),
});
export default yupSchema;
