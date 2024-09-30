const form = {
  name: 'PaymentMethod',
  intl: {
    titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._Title',
    title: 'PaymentMethod',
    descriptionId: '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._Description',
    description: 'PaymentMethod Description',
  },
  hideOn: null,
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'paymentMethod',
      custom: null,
      order: 4,
      hideOn: null,
      disableOn: { action: 'update' },
      fullWidth: true,
      inlineEdit: null,
      type: 'PaymentMethod',
      intl: {
        titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._FormField.paymentMethod._Title',
        title: 'paymentMethod',
        descriptionId:
          '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._FormField.paymentMethod._Description',
        description: 'paymentMethod Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'crypto',
          intl: {
            titleId: '_Version.yoh-82._SchemaEnum.PaymentMethod._EnumField.crypto._Title',
            title: 'crypto',
            descriptionId: '_Version.yoh-82._SchemaEnum.PaymentMethod._EnumField.crypto._Description',
            description: 'crypto Description',
          },
        },
        {
          name: 'stripe',
          intl: {
            titleId: '_Version.yoh-82._SchemaEnum.PaymentMethod._EnumField.stripe._Title',
            title: 'stripe',
            descriptionId: '_Version.yoh-82._SchemaEnum.PaymentMethod._EnumField.stripe._Description',
            description: 'stripe Description',
          },
        },
      ],
    },
    {
      name: 'currencyCode',
      custom: null,
      order: 5,
      hideOn: { field: { name: 'paymentMethod', operator: '===', value: 'crypto' } },
      disableOn: { action: 'update' },
      fullWidth: true,
      inlineEdit: null,
      type: 'CurrencyCode',
      intl: {
        titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._FormField.currencyCode._Title',
        title: 'currencyCode',
        descriptionId:
          '_Admin.User._PageGroup.Website._Page.Website._Form.PaymentMethod._FormField.currencyCode._Description',
        description: 'currencyCode Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'usd',
          intl: {
            titleId: '_Version.yoh-82._SchemaEnum.CurrencyCode._EnumField.usd._Title',
            title: 'usd',
            descriptionId: '_Version.yoh-82._SchemaEnum.CurrencyCode._EnumField.usd._Description',
            description: 'usd Description',
          },
        },
      ],
    },
  ],
};
export default form;
