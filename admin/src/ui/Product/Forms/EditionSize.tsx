const form = {
  name: 'EditionSize',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EditionSize._Title',
    title: 'EditionSize',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EditionSize._Description',
    description: 'EditionSize Description',
  },
  hideOn: { field: { name: 'isExternalNft', operator: '===', value: true }, action: 'view' },
  disableOn: null,
  order: 8,
  formFields: [
    {
      name: 'editionSize',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EditionSize._FormField.editionSize._Title',
        title: 'editionSize',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.EditionSize._FormField.editionSize._Description',
        description: 'editionSize Description',
      },
    },
  ],
};
export default form;
