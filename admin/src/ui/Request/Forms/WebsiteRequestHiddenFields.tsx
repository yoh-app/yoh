const form = {
  name: 'WebsiteRequestHiddenFields',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestHiddenFields._Title',
    title: 'WebsiteRequestHiddenFields',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestHiddenFields._Description',
    description: 'WebsiteRequestHiddenFields Description',
  },
  hideOn: { action: 'all' },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'requestStatus',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'RequestStatus',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestHiddenFields._FormField.requestStatus._Title',
        title: 'requestStatus',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestHiddenFields._FormField.requestStatus._Description',
        description: 'requestStatus Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'active',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.active._Title',
            title: 'active',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.active._Description',
            description: 'active Description',
          },
        },
        {
          name: 'completed',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.completed._Title',
            title: 'completed',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.completed._Description',
            description: 'completed Description',
          },
        },
        {
          name: 'expired',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.expired._Title',
            title: 'expired',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.expired._Description',
            description: 'expired Description',
          },
        },
        {
          name: 'pending',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.pending._Title',
            title: 'pending',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.pending._Description',
            description: 'pending Description',
          },
        },
        {
          name: 'processing',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.processing._Title',
            title: 'processing',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.processing._Description',
            description: 'processing Description',
          },
        },
        {
          name: 'rejected',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.rejected._Title',
            title: 'rejected',
            descriptionId: '_Version.yoh-92._SchemaEnum.RequestStatus._EnumField.rejected._Description',
            description: 'rejected Description',
          },
        },
      ],
    },
  ],
};
export default form;
