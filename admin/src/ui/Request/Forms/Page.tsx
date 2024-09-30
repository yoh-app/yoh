const form = {
  name: 'Page',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Page._Title',
    title: 'Page',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Page._Description',
    description: 'Page Description',
  },
  app: null,
  hideOn: { field: { name: 'page', value: null, operator: '===' } },
  disableOn: null,
  order: 3,
  formFields: [
    {
      name: 'page',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Page',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Page._FormField.page._Title',
        title: 'page',
        descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Page._FormField.page._Description',
        description: 'page Description',
      },
    },
  ],
};
export default form;
