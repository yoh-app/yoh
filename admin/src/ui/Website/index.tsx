import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Website';

import Active from './Forms/Active';
import Description from './Forms/Description';
import Gasless from './Forms/Gasless';
import Location from './Forms/Location';
import Logo from './Forms/Logo';
import Settings from './Forms/Settings';
import WebsiteSlug from './Forms/WebsiteSlug';
const ui = {
  forms: [Active, Description, Gasless, Location, Logo, Settings, WebsiteSlug],
  name: 'Website',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Website',
    titleId: '_Version.yoh-31._SchemaModel.Website._Title',
    description: 'Website Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Website._Description',
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
