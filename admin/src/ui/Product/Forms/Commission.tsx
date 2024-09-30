const form = {
  name: 'Commission',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._Title',
    title: 'Commission',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._Description',
    description: 'Commission Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 8,
  formFields: [
    {
      name: 'useCommission',
      custom: null,
      order: 5,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Boolean',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._FormField.useCommission._Title',
        title: 'useCommission',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._FormField.useCommission._Description',
        description: 'useCommission Description',
      },
    },
    {
      name: 'commissionFee',
      custom: null,
      order: 6,
      hideOn: { field: { name: 'useCommission', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useCommission', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._FormField.commissionFee._Title',
        title: 'commissionFee',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Commission._FormField.commissionFee._Description',
        description: 'commissionFee Description',
      },
    },
  ],
};
export default form;
