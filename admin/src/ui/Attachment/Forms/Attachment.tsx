const form = {
  name: 'Attachment',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Attachment._Form.Attachment._Title',
    title: 'Attachment',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._Form.Attachment._Description',
    description: 'Attachment Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'attachmentObj',
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
        titleId: '_Admin.Website._PageGroup.Media._Page.Attachment._Form.Attachment._FormField.attachmentObj._Title',
        title: 'attachmentObj',
        descriptionId:
          '_Admin.Website._PageGroup.Media._Page.Attachment._Form.Attachment._FormField.attachmentObj._Description',
        description: 'attachmentObj Description',
      },
    },
  ],
};
export default form;
