const form = {
  name: 'Type',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Type._Title',
    title: 'Type',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Type._Description',
    description: 'Type Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 1,
  formFields: [
    {
      name: 'productType',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'ProductType',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Type._FormField.productType._Title',
        title: 'productType',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Type._FormField.productType._Description',
        description: 'productType Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'deal',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.deal._Title',
            title: 'deal',
            descriptionId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.deal._Description',
            description: 'deal Description',
          },
        },
        {
          name: 'event',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.event._Title',
            title: 'event',
            descriptionId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.event._Description',
            description: 'event Description',
          },
        },
        {
          name: 'membership',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.membership._Title',
            title: 'membership',
            descriptionId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.membership._Description',
            description: 'membership Description',
          },
        },
        {
          name: 'product',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.product._Title',
            title: 'product',
            descriptionId: '_Version.pounds-11._SchemaEnum.ProductType._EnumField.product._Description',
            description: 'product Description',
          },
        },
      ],
    },
  ],
};
export default form;
