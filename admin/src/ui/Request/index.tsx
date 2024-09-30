import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Request';

import Adverstisement from './Forms/Adverstisement';
import Customer from './Forms/Customer';
import Message from './Forms/Message';
import Page from './Forms/Page';
import PaymentType from './Forms/PaymentType';
import Price from './Forms/Price';
import RequestHiddenFields from './Forms/RequestHiddenFields';
import TransactionHash from './Forms/TransactionHash';
import Video from './Forms/Video';
const ui = {
  forms: [Adverstisement, Customer, Message, Page, PaymentType, Price, RequestHiddenFields, TransactionHash, Video],
  name: 'Request',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Request',
    titleId: '_Version.yoh-31._SchemaModel.Request._Title',
    description: 'Request Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Request._Description',
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
