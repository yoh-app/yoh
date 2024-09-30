const form = {
  name: 'Content',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Content._Title',
    title: 'Content',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Content._Description',
    description: 'Content Description',
  },
  app: null,
  hideOn: { action: 'create', field: { name: 'isExternalLink', operator: '===', value: true } },
  disableOn: null,
  order: 5,
  formFields: [
    {
      name: 'content',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Json',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Content._FormField.content._Title',
        title: 'content',
        descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Content._FormField.content._Description',
        description: 'content Description',
      },
    },
  ],
};
export default form;
