const form = {
  name: 'ExternalNftEditionSize',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftEditionSize._Title',
    title: 'ExternalNftEditionSize',
    descriptionId:
      '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftEditionSize._Description',
    description: 'ExternalNftEditionSize Description',
  },
  hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true }, action: 'create' },
  disableOn: null,
  order: 9,
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
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftEditionSize._FormField.editionSize._Title',
        title: 'editionSize',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftEditionSize._FormField.editionSize._Description',
        description: 'editionSize Description',
      },
    },
  ],
};
export default form;
