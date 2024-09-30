import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/AdvertisementClick';

const ui = {
  forms: [],
  name: 'AdvertisementClick',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'AdvertisementClick',
    titleId: '_Version.yoh-0._SchemaModel.AdvertisementClick._Title',
    description: 'AdvertisementClick Description',
    descriptionId: '_Version.yoh-0._SchemaModel.AdvertisementClick._Description',
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
