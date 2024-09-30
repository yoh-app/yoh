const form = {
  name: 'Template',
  intl: {
    titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.Template._Title',
    title: 'Template',
    descriptionId: '_Admin.User._PageGroup.Website._Page.Website._Form.Template._Description',
    description: 'Template Description',
  },
  hideOn: { action: 'create' },
  disableOn: null,
  order: 7,
  formFields: [
    {
      name: 'isTemplate',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Boolean',
      intl: {
        titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.Template._FormField.isTemplate._Title',
        title: 'isTemplate',
        descriptionId: '_Admin.User._PageGroup.Website._Page.Website._Form.Template._FormField.isTemplate._Description',
        description: 'isTemplate Description',
      },
    },
  ],
};
export default form;
