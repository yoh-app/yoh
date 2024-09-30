const form = {
  name: 'Transaction',
  intl: {
    titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._Title',
    title: 'Transaction',
    descriptionId: '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._Description',
    description: 'Transaction Description',
  },
  app: null,
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
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'String',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._FormField.transactionHash._Title',
        title: 'transactionHash',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._FormField.transactionHash._Description',
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
        titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._FormField.walletAddress._Title',
        title: 'walletAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.Transaction._FormField.walletAddress._Description',
        description: 'walletAddress Description',
      },
    },
  ],
};
export default form;
