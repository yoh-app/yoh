const form = {
  name: 'CouponType',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._Title',
    title: 'CouponType',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._Description',
    description: 'CouponType Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 1,
  formFields: [
    {
      name: 'couponType',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'CouponType',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.couponType._Title',
        title: 'couponType',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.couponType._Description',
        description: 'couponType Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'amountOff',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.CouponType._EnumField.amountOff._Title',
            title: 'amountOff',
            descriptionId: '_Version.yoh-31._SchemaEnum.CouponType._EnumField.amountOff._Description',
            description: 'amountOff Description',
          },
        },
        {
          name: 'percentOff',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.CouponType._EnumField.percentOff._Title',
            title: 'percentOff',
            descriptionId: '_Version.yoh-31._SchemaEnum.CouponType._EnumField.percentOff._Description',
            description: 'percentOff Description',
          },
        },
      ],
    },
    {
      name: 'percentOff',
      custom: null,
      order: 2,
      hideOn: { field: { name: 'couponType', operator: '!==', value: 'percentOff' } },
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.percentOff._Title',
        title: 'percentOff',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.percentOff._Description',
        description: 'percentOff Description',
      },
    },
    {
      name: 'amountOff',
      custom: null,
      order: 3,
      hideOn: { field: { name: 'couponType', operator: '!==', value: 'amountOff' } },
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.amountOff._Title',
        title: 'amountOff',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.CouponType._FormField.amountOff._Description',
        description: 'amountOff Description',
      },
    },
  ],
};
export default form;
