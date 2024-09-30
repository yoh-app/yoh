const form = {
  name: 'Event',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._Title',
    title: 'Event',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._Description',
    description: 'Event Description',
  },
  app: null,
  hideOn: { field: { name: 'productType', operator: '!==', value: 'event' } },
  disableOn: null,
  order: 2,
  formFields: [
    {
      name: 'eventStartTime',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: { field: { name: 'productType', operator: '===', value: 'event' } },
      fullWidth: true,
      inlineEdit: null,
      type: 'DateTime',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._FormField.eventStartTime._Title',
        title: 'eventStartTime',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._FormField.eventStartTime._Description',
        description: 'eventStartTime Description',
      },
    },
    {
      name: 'eventEndTime',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: { field: { name: 'productType', operator: '===', value: 'event' } },
      fullWidth: true,
      inlineEdit: null,
      type: 'DateTime',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._FormField.eventEndTime._Title',
        title: 'eventEndTime',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Event._FormField.eventEndTime._Description',
        description: 'eventEndTime Description',
      },
    },
  ],
};
export default form;
