import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Product';

import Active from './Forms/Active';
import Commission from './Forms/Commission';
import Description from './Forms/Description';
import ExternalUrl from './Forms/ExternalUrl';
import Gallery from './Forms/Gallery';
import Image from './Forms/Image';
import Nft from './Forms/Nft';
import NftInformation from './Forms/NftInformation';
import Price from './Forms/Price';
import ProductSlug from './Forms/ProductSlug';
import Quantity from './Forms/Quantity';
import Royalty from './Forms/Royalty';
const ui = {
  forms: [
    Active,
    Commission,
    Description,
    ExternalUrl,
    Gallery,
    Image,
    Nft,
    NftInformation,
    Price,
    ProductSlug,
    Quantity,
    Royalty,
  ],
  name: 'Product',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Product',
    titleId: '_Version.yoh-31._SchemaModel.Product._Title',
    description: 'Product Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Product._Description',
  },

  grid: {
    cardBreakpoints: {
      xs: 12,
      md: 4,
    },
    fieldBreakpoints: {
      xs: 12,
      md: 4,
    },
    buttonBreakpoints: {
      xs: 12,
      md: 4,
    },
  },
};
export default ui;
