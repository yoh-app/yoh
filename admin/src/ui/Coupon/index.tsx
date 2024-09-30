import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import yupSchema from 'yupSchema/Coupon';

import Active from './Forms/Active';
import CouponSlug from './Forms/CouponSlug';
import CouponType from './Forms/CouponType';
import Description from './Forms/Description';
import Time from './Forms/Time';
const ui = {
  forms: [Active, CouponSlug, CouponType, Description, Time],
  name: 'Coupon',
  tableComponent: BasicGrid,
  editRecordComponent: BasicEditRecord,
  updateFormComponent: BasicForm,
  createFormComponent: BasicForm,
  yupSchema,
  intl: {
    title: 'Coupon',
    titleId: '_Version.yoh-31._SchemaModel.Coupon._Title',
    description: 'Coupon Description',
    descriptionId: '_Version.yoh-31._SchemaModel.Coupon._Description',
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
