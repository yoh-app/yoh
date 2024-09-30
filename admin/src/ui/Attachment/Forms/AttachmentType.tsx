const form = {
  name: 'AttachmentType',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Attachment._Form.AttachmentType._Title',
    title: 'AttachmentType',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._Form.AttachmentType._Description',
    description: 'AttachmentType Description',
  },
  app: null,
  hideOn: { action: 'all' },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'attachmentType',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'AttachmentType',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Media._Page.Attachment._Form.AttachmentType._FormField.attachmentType._Title',
        title: 'attachmentType',
        descriptionId:
          '_Admin.Website._PageGroup.Media._Page.Attachment._Form.AttachmentType._FormField.attachmentType._Description',
        description: 'attachmentType Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'audio',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.audio._Title',
            title: 'audio',
            descriptionId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.audio._Description',
            description: 'audio Description',
          },
        },
        {
          name: 'document',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.document._Title',
            title: 'document',
            descriptionId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.document._Description',
            description: 'document Description',
          },
        },
        {
          name: 'image',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.image._Title',
            title: 'image',
            descriptionId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.image._Description',
            description: 'image Description',
          },
        },
        {
          name: 'video',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.video._Title',
            title: 'video',
            descriptionId: '_Version.pounds-11._SchemaEnum.AttachmentType._EnumField.video._Description',
            description: 'video Description',
          },
        },
      ],
    },
  ],
};
export default form;
