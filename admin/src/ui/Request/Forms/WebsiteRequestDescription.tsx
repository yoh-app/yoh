const form = {
  name: 'WebsiteRequestDescription',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._Title',
    title: 'WebsiteRequestDescription',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._Description',
    description: 'WebsiteRequestDescription Description',
  },
  hideOn: null,
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'subject',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.subject._Title',
        title: 'subject',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.subject._Description',
        description: 'subject Description',
      },
    },
    {
      name: 'message',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.message._Title',
        title: 'message',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.message._Description',
        description: 'message Description',
      },
    },
    {
      name: 'createdAt',
      custom: null,
      order: 3,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'DateTime',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.createdAt._Title',
        title: 'createdAt',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.createdAt._Description',
        description: 'createdAt Description',
      },
    },
    {
      name: 'price',
      custom: null,
      order: 5,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.price._Title',
        title: 'price',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.price._Description',
        description: 'price Description',
      },
    },
    {
      name: 'applicationFee',
      custom: null,
      order: 6,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.applicationFee._Title',
        title: 'applicationFee',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.applicationFee._Description',
        description: 'applicationFee Description',
      },
    },
    {
      name: 'stripeFee',
      custom: null,
      order: 7,
      hideOn: { field: { name: 'stripeFee', operator: '===', value: null } },
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.stripeFee._Title',
        title: 'stripeFee',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.stripeFee._Description',
        description: 'stripeFee Description',
      },
    },
    {
      name: 'total',
      custom: null,
      order: 8,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Float',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.total._Title',
        title: 'total',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestDescription._FormField.total._Description',
        description: 'total Description',
      },
    },
  ],
};
export default form;
