import * as yup from 'yup';
const yupSchema = yup.object().shape({
  active: yup.boolean().nullable(true),

  attachments: yup.mixed().nullable(true),

  chain: yup.string().when('useNft', (useNft, schema) => {
    if (useNft === true) {
      return schema.required();
    } else {
      return schema.nullable(true);
    }
  }),

  commissionFee: yup
    .number()
    .min(0, 'validation-num-gte-0')
    .when('useCommission', (useCommission, schema) => {
      if (useCommission === true) {
        return schema.required();
      } else {
        return schema.nullable(true);
      }
    }),

  content: yup.mixed().nullable(true),

  contractAddress: yup.string().nullable(true),

  coupons: yup.mixed().nullable(true),

  createdAt: yup.date().nullable(true),

  deleted: yup.boolean().nullable(true),

  deletedAt: yup.date().nullable(true),

  description: yup.string().nullable(true).max(2000, 'validation-string-max-length-200'),

  endTime: yup.date().nullable(true),

  eventEndTime: yup.date().nullable(true),

  eventStartTime: yup.date().nullable(true),

  externalNftChain: yup.string().nullable(true),

  externalNftContractAddress: yup.string().nullable(true),

  externalUrl: yup
    .string()
    .nullable(true)

    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'validation-url',
    ),
  gallery: yup.mixed().nullable(true),

  hasLocation: yup.boolean().nullable(true),

  id: yup.string().nullable(true),

  imageObj: yup.mixed().nullable(true),

  locationAddress: yup.string().nullable(true),

  locationLat: yup.mixed().nullable(true),

  locationLng: yup.mixed().nullable(true),

  marketingLocations: yup.mixed().nullable(true),

  maxQuantity: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  name: yup.string().nullable(true).max(40, 'validation-string-max-length-40'),

  orderedProducts: yup.mixed().nullable(true),

  pages: yup.mixed().nullable(true),

  price: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  productCollections: yup.mixed().nullable(true),

  productGroups: yup.mixed().nullable(true),

  productType: yup.string().nullable(true),

  prodyctType: yup.string().nullable(true),

  quantity: yup
    .number()
    .min(0, 'validation-num-gte-0')
    .when('useQuantity', (useQuantity, schema) => {
      if (useQuantity === true) {
        return schema.required();
      } else {
        return schema.nullable(true);
      }
    }),

  quantitySold: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  royaltyFee: yup
    .number()
    .min(0, 'validation-num-gte-0')
    .when('useNft', (useNft, schema) => {
      if (useNft === true) {
        return schema.required();
      } else {
        return schema.nullable(true);
      }
    }),

  salePrice: yup.number().min(0, 'validation-num-gte-0').nullable(true),

  slug: yup.string().nullable(true),

  startTime: yup.date().nullable(true),

  transactionHash: yup.string().nullable(true),

  updatedAt: yup.date().nullable(true),

  useCommission: yup.boolean().nullable(true),

  useExternalNft: yup.boolean().nullable(true),

  useNft: yup.boolean().nullable(true),

  useQuantity: yup.boolean().nullable(true),

  useRoyalty: yup.boolean().nullable(true),

  useStartTime: yup.boolean().nullable(true),

  useUsd: yup.boolean().nullable(true),

  useVariations: yup.boolean().nullable(true),

  variationOptions: yup.mixed().nullable(true),

  variations: yup.mixed().nullable(true),

  website: yup.mixed().nullable(true),

  websiteId: yup.string().nullable(true),
});
export default yupSchema;
