import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/OrderedProduct';

import Description from './Forms/Description';
import Price from './Forms/Price';
import Quantity from './Forms/Quantity';
import TokenId from './Forms/TokenId';
const ui = {
  forms: [Description, Price, Quantity, TokenId],
  name: 'OrderedProduct',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'OrderedProduct',
    titleId: '_Version.yoh-31._SchemaModel.OrderedProduct._Title',
    description: 'OrderedProduct Description',
    descriptionId: '_Version.yoh-31._SchemaModel.OrderedProduct._Description',
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
