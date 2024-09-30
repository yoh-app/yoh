import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/User';

import UserEmail from './Forms/UserEmail';
const ui = {
  forms: [UserEmail],
  name: 'User',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'User',
    titleId: '_Version.yoh-31._SchemaModel.User._Title',
    description: 'User Description',
    descriptionId: '_Version.yoh-31._SchemaModel.User._Description',
  },
  admin: true,
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
