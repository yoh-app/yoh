import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Affiliate';

import Accepted from './Forms/Accepted';
import Customer from './Forms/Customer';
import Description from './Forms/Description';
import Social from './Forms/Social';
import WalletAddress from './Forms/WalletAddress';
const ui = {
  forms: [Accepted, Customer, Description, Social, WalletAddress],
  name: 'Affiliate',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Affiliate',
    titleId: '_Version.yoh-31._SchemaModel.Affiliate._Title',
    description: 'Affiliate Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Affiliate._Description',
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
