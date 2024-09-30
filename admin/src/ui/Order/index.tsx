import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Order';

import Affiliate from './Forms/Affiliate';
import Coupon from './Forms/Coupon';
import Customer from './Forms/Customer';
import OrderTotal from './Forms/OrderTotal';
import PaymentType from './Forms/PaymentType';
import Tracking from './Forms/Tracking';
import Transaction from './Forms/Transaction';
const ui = {
  forms: [Affiliate, Coupon, Customer, OrderTotal, PaymentType, Tracking, Transaction],
  name: 'Order',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Order',
    titleId: '_Version.yoh-31._SchemaModel.Order._Title',
    description: 'Order Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Order._Description',
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
