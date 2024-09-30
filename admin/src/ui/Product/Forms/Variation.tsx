import variations from 'ui/Product/Fields/variations';
import variationOptions from 'ui/Product/Fields/variationOptions';
const form = {
  name: 'Variation',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._Title',
    title: 'Variation',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._Description',
    description: 'Variation Description',
  },
  app: null,
  hideOn: { field: { name: 'isExternalNft', operator: '===', value: true } },
  disableOn: null,
  order: 5,
  formFields: [
    {
      name: 'useVariation',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'Boolean',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.useVariation._Title',
        title: 'useVariation',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.useVariation._Description',
        description: 'useVariation Description',
      },
    },
    {
      name: 'variations',
      custom: variations,
      order: 2,
      hideOn: { field: { name: 'useVariation', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Json',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.variations._Title',
        title: 'variations',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.variations._Description',
        description: 'variations Description',
      },
    },
    {
      name: 'variationOptions',
      custom: variationOptions,
      order: 3,
      hideOn: { field: { name: 'useVariation', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Json',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.variationOptions._Title',
        title: 'variationOptions',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variation._FormField.variationOptions._Description',
        description: 'variationOptions Description',
      },
    },
  ],
};
export default form;
