const form = {
  name: 'ExternalNftInfo',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._Title',
    title: 'ExternalNftInfo',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._Description',
    description: 'ExternalNftInfo Description',
  },
  hideOn: { action: 'create' },
  disableOn: null,
  order: 1,
  formFields: [
    {
      name: 'name',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.name._Title',
        title: 'name',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.name._Description',
        description: 'name Description',
      },
    },
    {
      name: 'chain',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.chain._Title',
        title: 'chain',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.chain._Description',
        description: 'chain Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'mainnet',
          intl: {
            titleId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.mainnet._Title',
            title: 'mainnet',
            descriptionId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.mainnet._Description',
            description: 'mainnet Description',
          },
        },
        {
          name: 'polygon',
          intl: {
            titleId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.polygon._Title',
            title: 'polygon',
            descriptionId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.polygon._Description',
            description: 'polygon Description',
          },
        },
        {
          name: 'polygonMumbai',
          intl: {
            titleId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.polygonMumbai._Title',
            title: 'polygonMumbai',
            descriptionId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.polygonMumbai._Description',
            description: 'polygonMumbai Description',
          },
        },
        {
          name: 'rinkeby',
          intl: {
            titleId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.rinkeby._Title',
            title: 'rinkeby',
            descriptionId: '_Version.yoh-17._SchemaEnum.Chain._EnumField.rinkeby._Description',
            description: 'rinkeby Description',
          },
        },
      ],
    },
    {
      name: 'contractAddress',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.contractAddress._Title',
        title: 'contractAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._FormField.contractAddress._Description',
        description: 'contractAddress Description',
      },
    },
  ],
};
export default form;
