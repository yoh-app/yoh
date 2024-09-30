import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Advertisement';

import Adverstisement from './Forms/Adverstisement';
import AdvertisementHiddenFields from './Forms/AdvertisementHiddenFields';
import Customer from './Forms/Customer';
import Message from './Forms/Message';
import TransactionHash from './Forms/TransactionHash';
const ui = {
  forms: [Adverstisement, AdvertisementHiddenFields, Customer, Message, TransactionHash],
  name: 'Advertisement',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Advertisement',
    titleId: '_Version.yoh-0._SchemaModel.Advertisement._Title',
    description: 'Advertisement Description',
    descriptionId: '_Version.yoh-0._SchemaModel.Advertisement._Description',
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
