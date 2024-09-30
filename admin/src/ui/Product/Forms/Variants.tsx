import variations from 'ui/Product/Fields/variations';
import variationOptions from 'ui/Product/Fields/variationOptions';
const form = {
  name: 'Variants',
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._Title',
    title: 'Variants',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._Description',
    description: 'Variants Description',
  },
  app: null,
  hideOn: { field: { name: 'productType', operator: '!==', value: 'product' } },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'useVariations',
      custom: null,
      order: 1,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Boolean',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.useVariations._Title',
        title: 'useVariations',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.useVariations._Description',
        description: 'useVariations Description',
      },
    },
    {
      name: 'variations',
      custom: variations,
      order: 2,
      hideOn: { field: { name: 'useVariations', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Json',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.variations._Title',
        title: 'variations',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.variations._Description',
        description: 'variations Description',
      },
    },
    {
      name: 'variationOptions',
      custom: variationOptions,
      order: 3,
      hideOn: { field: { name: 'useVariations', operator: '!==', value: true } },
      disableOn: null,
      requiredOn: null,
      fullWidth: null,
      inlineEdit: null,
      type: 'Json',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.variationOptions._Title',
        title: 'variationOptions',
        descriptionId:
          '_Admin.Website._PageGroup.Product Management._Page.Product._Form.Variants._FormField.variationOptions._Description',
        description: 'variationOptions Description',
      },
    },
  ],
};
export default form;
