const form = {
  name: 'ExternalNftDescription',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._Title',
    title: 'ExternalNftDescription',
    descriptionId:
      '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._Description',
    description: 'ExternalNftDescription Description',
  },
  hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true }, action: 'create' },
  disableOn: null,
  order: 2,
  formFields: [
    {
      name: 'name',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.name._Title',
        title: 'name',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.name._Description',
        description: 'name Description',
      },
    },
    {
      name: 'description',
      custom: null,
      order: 4,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.description._Title',
        title: 'description',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.description._Description',
        description: 'description Description',
      },
    },
    {
      name: 'slug',
      custom: null,
      order: 5,
      hideOn: { action: 'create' },
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.slug._Title',
        title: 'slug',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.slug._Description',
        description: 'slug Description',
      },
    },
    {
      name: 'imageObj',
      custom: null,
      order: 6,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.imageObj._Title',
        title: 'imageObj',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.imageObj._Description',
        description: 'imageObj Description',
      },
    },
    {
      name: 'createdAt',
      custom: null,
      order: 7,
      hideOn: null,
      disableOn: null,
      fullWidth: true,
      inlineEdit: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.createdAt._Title',
        title: 'createdAt',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftDescription._FormField.createdAt._Description',
        description: 'createdAt Description',
      },
    },
  ],
};
export default form;
