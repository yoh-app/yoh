const form = {
  name: 'Time',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._Title',
    title: 'Time',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._Description',
    description: 'Time Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 2,
  formFields: [
    {
      name: 'startAt',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'DateTime',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._FormField.startAt._Title',
        title: 'startAt',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._FormField.startAt._Description',
        description: 'startAt Description',
      },
    },
    {
      name: 'expiredAt',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'DateTime',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._FormField.expiredAt._Title',
        title: 'expiredAt',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Coupon._Form.Time._FormField.expiredAt._Description',
        description: 'expiredAt Description',
      },
    },
  ],
};
export default form;
