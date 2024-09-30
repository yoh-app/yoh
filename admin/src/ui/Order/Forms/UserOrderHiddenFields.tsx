const form = {
  name: 'UserOrderHiddenFields',
  intl: {
    titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderHiddenFields._Title',
    title: 'UserOrderHiddenFields',
    descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderHiddenFields._Description',
    description: 'UserOrderHiddenFields Description',
  },
  hideOn: { action: 'all' },
  order: 4,
  formFields: [
    {
      name: 'amount',
      custom: null,
      order: 100,
      hideOn: null,
      fullWidth: null,
      inlineEdit: null,
      intl: {
        titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderHiddenFields._FormField.amount._Title',
        title: 'amount',
        descriptionId:
          '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderHiddenFields._FormField.amount._Description',
        description: 'amount Description',
      },
    },
  ],
};
export default form;
