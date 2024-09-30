const form = {
  name: 'Price',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._Title',
    title: 'Price',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._Description',
    description: 'Price Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'price',
      custom: null,
      order: 5,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.price._Title',
        title: 'price',
        descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.price._Description',
        description: 'price Description',
      },
    },
    {
      name: 'applicationFee',
      custom: null,
      order: 6,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.applicationFee._Title',
        title: 'applicationFee',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.applicationFee._Description',
        description: 'applicationFee Description',
      },
    },
    {
      name: 'stripeFee',
      custom: null,
      order: 6,
      hideOn: { field: { name: 'stripeFee', operator: '===', value: null } },
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.stripeFee._Title',
        title: 'stripeFee',
        descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.stripeFee._Description',
        description: 'stripeFee Description',
      },
    },
    {
      name: 'total',
      custom: null,
      order: 8,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.total._Title',
        title: 'total',
        descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Price._FormField.total._Description',
        description: 'total Description',
      },
    },
  ],
};
export default form;