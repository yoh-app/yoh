import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Page';

import Basic from './Forms/Basic';
import Content from './Forms/Content';
import Image from './Forms/Image';
import Menu from './Forms/Menu';
import PageHiddenFields from './Forms/PageHiddenFields';
import Password from './Forms/Password';
const ui = {
  forms: [Basic, Content, Image, Menu, PageHiddenFields, Password],
  name: 'Page',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Page',
    titleId: '_Version.yoh-31._SchemaModel.Page._Title',
    description: 'Page Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Page._Description',
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
