const form = {
  name: 'Nft',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._Title',
    title: 'Nft',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._Description',
    description: 'Nft Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 3,
  formFields: [
    {
      name: 'useNft',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Boolean',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._FormField.useNft._Title',
        title: 'useNft',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._FormField.useNft._Description',
        description: 'useNft Description',
      },
    },
    {
      name: 'chain',
      custom: null,
      order: 3,
      hideOn: { field: { name: 'useNft', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useNft', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'Chain',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._FormField.chain._Title',
        title: 'chain',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Nft._FormField.chain._Description',
        description: 'chain Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'arbitrum',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.arbitrum._Title',
            title: 'arbitrum',
            descriptionId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.arbitrum._Description',
            description: 'arbitrum Description',
          },
        },
        {
          name: 'avalanche',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.avalanche._Title',
            title: 'avalanche',
            descriptionId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.avalanche._Description',
            description: 'avalanche Description',
          },
        },
        {
          name: 'ethereum',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.ethereum._Title',
            title: 'ethereum',
            descriptionId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.ethereum._Description',
            description: 'ethereum Description',
          },
        },
        {
          name: 'polygon',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.polygon._Title',
            title: 'polygon',
            descriptionId: '_Version.yoh-31._SchemaEnum.Chain._EnumField.polygon._Description',
            description: 'polygon Description',
          },
        },
      ],
    },
  ],
};
export default form;
