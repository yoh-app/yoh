import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  amount: yup.number().min(0, 'validation-num-gte-0').required('validation-required'),

  countryCode: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  currencyCode: yup.string().nullable(true),

  id: yup.string().nullable(true),

  isGlobal: yup.boolean().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  state: yup.string().nullable(true),

  type: yup.string().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
