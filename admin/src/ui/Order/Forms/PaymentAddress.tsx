const form = {
  name: 'PaymentAddress',
  intl: {
    titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentAddress._Title',
    title: 'PaymentAddress',
    descriptionId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentAddress._Description',
    description: 'PaymentAddress Description',
  },
  hideOn: null,
  disableOn: null,
  order: 6,
  formFields: [
    {
      name: 'walletAddress',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentAddress._FormField.walletAddress._Title',
        title: 'walletAddress',
        descriptionId:
          '_Admin.Website._PageGroup.Order._Page.Order._Form.PaymentAddress._FormField.walletAddress._Description',
        description: 'walletAddress Description',
      },
    },
  ],
};
export default form;
