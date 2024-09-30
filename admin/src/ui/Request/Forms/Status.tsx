const form = {
  name: 'Status',
  intl: {
    titleId: '_Admin.User._PageGroup.Request._Page.Request._Form.Status._Title',
    title: 'Status',
    descriptionId: '_Admin.User._PageGroup.Request._Page.Request._Form.Status._Description',
    description: 'Status Description',
  },
  hideOn: null,
  order: 2,
  formFields: [
    {
      name: 'requestStatus',
      custom: null,
      order: 100,
      hideOn: null,
      fullWidth: null,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.User._PageGroup.Request._Page.Request._Form.Status._FormField.requestStatus._Title',
        title: 'requestStatus',
        descriptionId:
          '_Admin.User._PageGroup.Request._Page.Request._Form.Status._FormField.requestStatus._Description',
        description: 'requestStatus Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'active',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.active._Title',
            title: 'active',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.active._Description',
            description: 'active Description',
          },
        },
        {
          name: 'completed',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.completed._Title',
            title: 'completed',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.completed._Description',
            description: 'completed Description',
          },
        },
        {
          name: 'expired',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.expired._Title',
            title: 'expired',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.expired._Description',
            description: 'expired Description',
          },
        },
        {
          name: 'pending',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.pending._Title',
            title: 'pending',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.pending._Description',
            description: 'pending Description',
          },
        },
        {
          name: 'processing',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.processing._Title',
            title: 'processing',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.processing._Description',
            description: 'processing Description',
          },
        },
        {
          name: 'rejected',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.rejected._Title',
            title: 'rejected',
            descriptionId: '_Version.yoh-2._SchemaEnum.RequestStatus._EnumField.rejected._Description',
            description: 'rejected Description',
          },
        },
      ],
    },
  ],
};
export default form;
