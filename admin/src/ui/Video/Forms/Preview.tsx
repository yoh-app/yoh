const form = {
  name: 'Preview',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Preview._Title',
    title: 'Preview',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Preview._Description',
    description: 'Preview Description',
  },
  app: null,
  hideOn: { field: { name: 'isExternalLink', value: true, operator: '===' } },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'videoPreviewObj',
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
        titleId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Preview._FormField.videoPreviewObj._Title',
        title: 'videoPreviewObj',
        descriptionId:
          '_Admin.Website._PageGroup.Media._Page.Video._Form.Preview._FormField.videoPreviewObj._Description',
        description: 'videoPreviewObj Description',
      },
    },
  ],
};
export default form;
