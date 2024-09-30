const form = {
  name: 'Video',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Video._Title',
    title: 'Video',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Video._Description',
    description: 'Video Description',
  },
  app: null,
  hideOn: { field: { name: 'isExternalLink', value: true, operator: '===' } },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'videoObj',
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
        titleId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Video._FormField.videoObj._Title',
        title: 'videoObj',
        descriptionId: '_Admin.Website._PageGroup.Media._Page.Video._Form.Video._FormField.videoObj._Description',
        description: 'videoObj Description',
      },
    },
  ],
};
export default form;
