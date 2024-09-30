const form = {
  name: 'ExternalNft',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._Title',
    title: 'ExternalNft',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._Description',
    description: 'ExternalNft Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'useExternalNft',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Boolean',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.useExternalNft._Title',
        title: 'useExternalNft',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.useExternalNft._Description',
        description: 'useExternalNft Description',
      },
    },
    {
      name: 'externalNftChain',
      custom: null,
      order: 3,
      hideOn: { field: { name: 'useExternalNft', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useExternalNft', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'Chain',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.externalNftChain._Title',
        title: 'externalNftChain',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.externalNftChain._Description',
        description: 'externalNftChain Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'arbitrum',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.arbitrum._Title',
            title: 'arbitrum',
            descriptionId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.arbitrum._Description',
            description: 'arbitrum Description',
          },
        },
        {
          name: 'avalanche',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.avalanche._Title',
            title: 'avalanche',
            descriptionId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.avalanche._Description',
            description: 'avalanche Description',
          },
        },
        {
          name: 'ethereum',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.ethereum._Title',
            title: 'ethereum',
            descriptionId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.ethereum._Description',
            description: 'ethereum Description',
          },
        },
        {
          name: 'polygon',
          intl: {
            titleId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.polygon._Title',
            title: 'polygon',
            descriptionId: '_Version.pounds-11._SchemaEnum.Chain._EnumField.polygon._Description',
            description: 'polygon Description',
          },
        },
      ],
    },
    {
      name: 'externalNftContractAddress',
      custom: null,
      order: 4,
      hideOn: { field: { name: 'useExternalNft', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useExternalNft', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.externalNftContractAddress._Title',
        title: 'externalNftContractAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNft._FormField.externalNftContractAddress._Description',
        description: 'externalNftContractAddress Description',
      },
    },
  ],
};
export default form;
