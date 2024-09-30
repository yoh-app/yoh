import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Value';
const ui = {
  name: 'Value',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Value',
    titleId: '_Version.yoh-92._SchemaModel.Value._Title',
    description: 'Value Description',
    descriptionId: '_Version.yoh-92._SchemaModel.Value._Description',
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
