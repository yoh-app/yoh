import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Video';

import Basic from './Forms/Basic';
import External from './Forms/External';
import Image from './Forms/Image';
import Preview from './Forms/Preview';
import Video from './Forms/Video';
const ui = {
  forms: [Basic, External, Image, Preview, Video],
  name: 'Video',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Video',
    titleId: '_Version.yoh-31._SchemaModel.Video._Title',
    description: 'Video Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Video._Description',
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
