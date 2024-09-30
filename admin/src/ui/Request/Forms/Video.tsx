const form = {
  name: 'Video',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Video._Title',
    title: 'Video',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Video._Description',
    description: 'Video Description',
  },
  app: null,
  hideOn: { field: { name: 'video', value: null, operator: '===' } },
  disableOn: null,
  order: 3,
  formFields: [
    {
      name: 'video',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Video',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Video._FormField.video._Title',
        title: 'video',
        descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.Video._FormField.video._Description',
        description: 'video Description',
      },
    },
  ],
};
export default form;
