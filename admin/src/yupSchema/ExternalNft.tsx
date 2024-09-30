import * as yup from 'yup';
const yupSchema = yup.object().shape({
  audios: yup.mixed().nullable(true),

  contractAddress: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(200, 'validation-string-max-length-200'),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  links: yup.mixed().nullable(true),

  name: yup.string().required('validation-required').max(40, 'validation-string-max-length-40'),

  ownerAddress: yup.string().nullable(true),

  videos: yup.mixed().nullable(true),
});
export default yupSchema;
