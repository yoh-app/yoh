const form = {
  name: 'Royalty',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Royalty._Title',
    title: 'Royalty',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Royalty._Description',
    description: 'Royalty Description',
  },
  app: null,
  hideOn: { field: { name: 'useNft', operator: '!==', value: true } },
  disableOn: null,
  order: 7,
  formFields: [
    {
      name: 'royaltyFee',
      custom: null,
      order: 2,
      hideOn: { field: { name: 'useNft', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: { field: { name: 'useNft', operator: '===', value: true } },
      fullWidth: true,
      inlineEdit: null,
      type: 'Int',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Royalty._FormField.royaltyFee._Title',
        title: 'royaltyFee',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Royalty._FormField.royaltyFee._Description',
        description: 'royaltyFee Description',
      },
    },
  ],
};
export default form;
