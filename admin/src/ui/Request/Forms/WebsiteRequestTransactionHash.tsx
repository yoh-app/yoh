const form = {
  name: 'WebsiteRequestTransactionHash',
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._Title',
    title: 'WebsiteRequestTransactionHash',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._Description',
    description: 'WebsiteRequestTransactionHash Description',
  },
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
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._FormField.transactionHash._Description',
        description: 'transactionHash Description',
      },
    },
    {
      name: 'walletAddress',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._FormField.walletAddress._Title',
        title: 'walletAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Request._Page.Request._Form.WebsiteRequestTransactionHash._FormField.walletAddress._Description',
        description: 'walletAddress Description',
      },
    },
  ],
};
export default form;
