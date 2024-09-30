const form = {
  name: 'TransactionHash',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._Title',
    title: 'TransactionHash',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._Description',
    description: 'TransactionHash Description',
  },
  app: null,
  hideOn: { field: { name: 'transactionHash', operator: '===', value: null } },
  disableOn: null,
  order: 6,
  formFields: [
    {
      name: 'transactionHash',
      custom: null,
      order: 100,
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
          '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._FormField.transactionHash._Description',
        description: 'transactionHash Description',
      },
    },
    {
      name: 'walletAddress',
      custom: null,
      order: 100,
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
          '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._FormField.walletAddress._Title',
        title: 'walletAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.TransactionHash._FormField.walletAddress._Description',
        description: 'walletAddress Description',
      },
    },
  ],
};
export default form;
