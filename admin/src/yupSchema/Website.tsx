import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  address: yup.mixed().nullable(true),

  adminFilters: yup.mixed().nullable(true),

  affiliates: yup.mixed().nullable(true),

  attachments: yup.mixed().nullable(true),

  attributes: yup.mixed().nullable(true),

  audioCollections: yup.mixed().nullable(true),

  audios: yup.mixed().nullable(true),

  chain: yup.mixed().nullable(true),

  coupons: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  currencyCode: yup.string().nullable(true),

  customers: yup.mixed().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  eventCollections: yup.mixed().nullable(true),

  eventGroups: yup.mixed().nullable(true),

  events: yup.mixed().nullable(true),

  gasless: yup.boolean().nullable(true),

  hasLocation: yup.boolean().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  isTemplate: yup.boolean().nullable(true),

  languageCode: yup.string().nullable(true),

  locationAddress: yup.string().nullable(true),

  locationLat: yup.mixed().nullable(true),

  locationLng: yup.mixed().nullable(true),

  logoObj: yup.mixed().nullable(true),

  marketingLocations: yup.mixed().nullable(true),

  menu: yup.mixed().nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  notifications: yup.mixed().nullable(true),

  orders: yup.mixed().nullable(true),

  pageCollections: yup.mixed().nullable(true),

  pages: yup.mixed().nullable(true),

  phone: yup.string().nullable(true),

  productCollections: yup.mixed().nullable(true),

  productGroups: yup.mixed().nullable(true),

  products: yup.mixed().nullable(true),

  slug: yup.string().nullable(true),

  stripeAccountId: yup.string().nullable(true),

  themeColor: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  user: yup.mixed().nullable(true),

  userId: yup.string().nullable(true),

  videoCollections: yup.mixed().nullable(true),

  videos: yup.mixed().nullable(true),

  walletAddress: yup.string().nullable(true),

  websiteGroups: yup.mixed().nullable(true),
});
export default yupSchema;
