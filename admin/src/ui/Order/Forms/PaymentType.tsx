const form = {
  name: 'PaymentType',
  intl: {
    titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentType._Title',
    title: 'PaymentType',
    descriptionId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentType._Description',
    description: 'PaymentType Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 2,
  formFields: [
    {
      name: 'paymentType',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'PaymentType',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentType._FormField.paymentType._Title',
        title: 'paymentType',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentType._FormField.paymentType._Description',
        description: 'paymentType Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'crypto',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.PaymentType._EnumField.crypto._Title',
            title: 'crypto',
            descriptionId: '_Version.yoh-31._SchemaEnum.PaymentType._EnumField.crypto._Description',
            description: 'crypto Description',
          },
        },
        {
          name: 'stripe',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.PaymentType._EnumField.stripe._Title',
            title: 'stripe',
            descriptionId: '_Version.yoh-31._SchemaEnum.PaymentType._EnumField.stripe._Description',
            description: 'stripe Description',
          },
        },
      ],
    },
  ],
};
export default form;
