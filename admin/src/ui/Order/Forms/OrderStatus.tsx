const form = {
  name: 'OrderStatus',
  intl: {
    titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._Title',
    title: 'OrderStatus',
    descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._Description',
    description: 'OrderStatus Description',
  },
  hideOn: null,
  order: 1,
  formFields: [
    {
      name: 'createdAt',
      custom: null,
      order: 100,
      hideOn: null,
      fullWidth: null,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.createdAt._Title',
        title: 'createdAt',
        descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.createdAt._Description',
        description: 'createdAt Description',
      },
    },
    {
      name: 'id',
      custom: null,
      order: 100,
      hideOn: null,
      fullWidth: null,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.id._Title',
        title: 'id',
        descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.id._Description',
        description: 'id Description',
      },
    },
    {
      name: 'orderStatus',
      custom: null,
      order: 100,
      hideOn: null,
      fullWidth: null,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.orderStatus._Title',
        title: 'orderStatus',
        descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.OrderStatus._FormField.orderStatus._Description',
        description: 'orderStatus Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'completed',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.completed._Title',
            title: 'completed',
            descriptionId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.completed._Description',
            description: 'completed Description',
          },
        },
        {
          name: 'pending',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.pending._Title',
            title: 'pending',
            descriptionId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.pending._Description',
            description: 'pending Description',
          },
        },
        {
          name: 'processing',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.processing._Title',
            title: 'processing',
            descriptionId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.processing._Description',
            description: 'processing Description',
          },
        },
        {
          name: 'shipped',
          intl: {
            titleId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.shipped._Title',
            title: 'shipped',
            descriptionId: '_Version.yoh-2._SchemaEnum.OrderStatus._EnumField.shipped._Description',
            description: 'shipped Description',
          },
        },
      ],
    },
  ],
};
export default form;
