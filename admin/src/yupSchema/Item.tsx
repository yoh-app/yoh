import * as yup from 'yup';
const yupSchema = yup.object().shape({
  block: yup.mixed().nullable(true),

  blockId: yup.string().nullable(true),

  collection: yup.mixed().nullable(true),

  collectionId: yup.string().nullable(true),

  createdAt: yup.date().nullable(true),

  embed: yup.mixed().nullable(true),

  embedId: yup.string().nullable(true),

  id: yup.string().nullable(true),

  itemType: yup.string().required('validation-required'),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  page: yup.mixed().nullable(true),

  pageId: yup.string().nullable(true),
});
export default yupSchema;
