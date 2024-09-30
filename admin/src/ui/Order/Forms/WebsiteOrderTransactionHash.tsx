const form = {
  name: 'WebsiteOrderTransactionHash',
  intl: {
    titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._Title',
    title: 'WebsiteOrderTransactionHash',
    descriptionId: '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._Description',
    description: 'WebsiteOrderTransactionHash Description',
  },
  hideOn: { field: { name: 'transactionHash', operator: '===', value: null } },
  disableOn: null,
  order: 5,
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
          '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._FormField.transactionHash._Description',
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
          '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._FormField.walletAddress._Title',
        title: 'walletAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderTransactionHash._FormField.walletAddress._Description',
        description: 'walletAddress Description',
      },
    },
  ],
};
export default form;
