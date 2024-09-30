const form = {
  name: 'NftInformation',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._Title',
    title: 'NftInformation',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._Description',
    description: 'NftInformation Description',
  },
  app: null,
  hideOn: { or: [{ action: 'create' }, { field: { name: 'useNft', operator: '!==', value: true } }] },
  disableOn: null,
  order: 12,
  formFields: [
    {
      name: 'contractAddress',
      custom: null,
      order: 4,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._FormField.contractAddress._Title',
        title: 'contractAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._FormField.contractAddress._Description',
        description: 'contractAddress Description',
      },
    },
    {
      name: 'transactionHash',
      custom: null,
      order: 5,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.NftInformation._FormField.transactionHash._Description',
        description: 'transactionHash Description',
      },
    },
  ],
};
export default form;
