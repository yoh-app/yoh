const form = {
  name: 'Price',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._Title',
    title: 'Price',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._Description',
    description: 'Price Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 6,
  formFields: [
    {
      name: 'price',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: { action: 'all' },
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._FormField.price._Title',
        title: 'price',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._FormField.price._Description',
        description: 'price Description',
      },
    },
    {
      name: 'salePrice',
      custom: null,
      order: 3,
      hideOn: { field: { name: 'useNft', operator: '===', value: true } },
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._FormField.salePrice._Title',
        title: 'salePrice',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Price._FormField.salePrice._Description',
        description: 'salePrice Description',
      },
    },
  ],
};
export default form;
