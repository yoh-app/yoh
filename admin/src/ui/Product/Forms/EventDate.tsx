const form = {
  name: 'EventDate',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._Title',
    title: 'EventDate',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._Description',
    description: 'EventDate Description',
  },
  app: null,
  hideOn: { field: { name: 'productType', operator: '!==', value: 'event' } },
  disableOn: null,
  order: 8,
  formFields: [
    {
      name: 'endDate',
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
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._FormField.endDate._Title',
        title: 'endDate',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._FormField.endDate._Description',
        description: 'endDate Description',
      },
    },
    {
      name: 'startDate',
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
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._FormField.startDate._Title',
        title: 'startDate',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EventDate._FormField.startDate._Description',
        description: 'startDate Description',
      },
    },
  ],
};
export default form;
