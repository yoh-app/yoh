import * as yup from 'yup';
const yupSchema = yup.object().shape({
  createdAt: yup.date().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  percentage: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  trait: yup.mixed().nullable(true),

  traitId: yup.string().nullable(true),
});
export default yupSchema;
