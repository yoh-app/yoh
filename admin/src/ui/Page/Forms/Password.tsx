const form = {
  name: 'Password',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Password._Title',
    title: 'Password',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Password._Description',
    description: 'Password Description',
  },
  app: null,
  hideOn: { field: { name: 'isExternalLink', operator: '===', value: true } },
  disableOn: null,
  order: 7,
  formFields: [
    {
      name: 'password',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Password._FormField.password._Title',
        title: 'password',
        descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Password._FormField.password._Description',
        description: 'password Description',
      },
    },
  ],
};
export default form;
