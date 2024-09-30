const form = {
  name: 'ExternalNftInfo',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._Title',
    title: 'ExternalNftInfo',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._Description',
    description: 'ExternalNftInfo Description',
  },
  hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true }, action: 'view' },
  disableOn: null,
  order: 2,
  formFields: [
    {
      name: 'externalNftChain',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Chain',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._FormField.externalNftChain._Title',
        title: 'externalNftChain',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._FormField.externalNftChain._Description',
        description: 'externalNftChain Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'Ethereum',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.Chain._EnumField.Ethereum._Title',
            title: 'Ethereum',
            descriptionId: '_Version.yoh-92._SchemaEnum.Chain._EnumField.Ethereum._Description',
            description: 'Ethereum Description',
          },
        },
        {
          name: 'Polygon',
          intl: {
            titleId: '_Version.yoh-92._SchemaEnum.Chain._EnumField.Polygon._Title',
            title: 'Polygon',
            descriptionId: '_Version.yoh-92._SchemaEnum.Chain._EnumField.Polygon._Description',
            description: 'Polygon Description',
          },
        },
      ],
    },
    {
      name: 'editionAddress',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._FormField.editionAddress._Title',
        title: 'editionAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftInfo._FormField.editionAddress._Description',
        description: 'editionAddress Description',
      },
    },
  ],
};
export default form;
