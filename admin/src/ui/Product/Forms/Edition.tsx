const form = {
  name: 'Edition',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._Title',
    title: 'Edition',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._Description',
    description: 'Edition Description',
  },
  hideOn: { action: 'create' },
  disableOn: null,
  order: 10,
  formFields: [
    {
      name: 'externalNftChain',
      custom: null,
      order: 1,
      hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true } },
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Chain',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.externalNftChain._Title',
        title: 'externalNftChain',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.externalNftChain._Description',
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
      name: 'editionSize',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionSize._Title',
        title: 'editionSize',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionSize._Description',
        description: 'editionSize Description',
      },
    },
    {
      name: 'editionMinted',
      custom: null,
      order: 3,
      hideOn: { field: { name: 'editionMinted', operator: '===', value: null } },
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionMinted._Title',
        title: 'editionMinted',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionMinted._Description',
        description: 'editionMinted Description',
      },
    },
    {
      name: 'editionAddress',
      custom: null,
      order: 4,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionAddress._Title',
        title: 'editionAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.editionAddress._Description',
        description: 'editionAddress Description',
      },
    },
    {
      name: 'transactionHash',
      custom: null,
      order: 5,
      hideOn: { field: { name: 'isExternalNft', operator: '===', value: true } },
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Edition._FormField.transactionHash._Description',
        description: 'transactionHash Description',
      },
    },
  ],
};
export default form;
