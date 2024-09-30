import * as yup from 'yup';
const yupSchema = yup.object().shape({
  amount: yup.number().min(0, 'validation-num-gte-0').required('validation-required'),

  createdAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  processed: yup.boolean().required('validation-required'),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
