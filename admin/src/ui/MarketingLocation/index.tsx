import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/MarketingLocation';

import Description from './Forms/Description';
import Image from './Forms/Image';
import Location from './Forms/Location';
const ui = {
  forms: [Description, Image, Location],
  name: 'MarketingLocation',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'MarketingLocation',
    titleId: '_Version.yoh-31._SchemaModel.MarketingLocation._Title',
    description: 'MarketingLocation Description',
    descriptionId: '_Version.yoh-31._SchemaModel.MarketingLocation._Description',
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
