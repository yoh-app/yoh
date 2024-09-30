import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Image';
const ui = {
  name: 'Image',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Image',
    titleId: '_Version.yoh-31._SchemaModel.Image._Title',
    description: 'Image Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Image._Description',
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
