const form = {
  name: 'Quantity',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._Title',
    title: 'Quantity',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._Description',
    description: 'Quantity Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 7,
  formFields: [
    {
      name: 'useQuantity',
      custom: null,
      order: 1,
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
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.useQuantity._Title',
        title: 'useQuantity',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.useQuantity._Description',
        description: 'useQuantity Description',
      },
    },
    {
      name: 'maxQuantity',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.maxQuantity._Title',
        title: 'maxQuantity',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.maxQuantity._Description',
        description: 'maxQuantity Description',
      },
    },
    {
      name: 'quantity',
      custom: null,
      order: 2,
      hideOn: { field: { name: 'useQuantity', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useQuantity', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.quantity._Title',
        title: 'quantity',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.quantity._Description',
        description: 'quantity Description',
      },
    },
    {
      name: 'quantitySold',
      custom: null,
      order: 3,
      hideOn: { action: 'create' },
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.quantitySold._Title',
        title: 'quantitySold',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Quantity._FormField.quantitySold._Description',
        description: 'quantitySold Description',
      },
    },
  ],
};
export default form;
