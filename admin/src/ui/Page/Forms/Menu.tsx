const form = {
  name: 'Menu',
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Menu._Title',
    title: 'Menu',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Menu._Description',
    description: 'Menu Description',
  },
  app: null,
  hideOn: { field: { name: 'isExternalLink', operator: '===', value: true } },
  disableOn: null,
  order: 3,
  formFields: [
    {
      name: 'navColor',
      custom: null,
      order: 2,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'NavColor',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Menu._FormField.navColor._Title',
        title: 'navColor',
        descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.Menu._FormField.navColor._Description',
        description: 'navColor Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'black',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.NavColor._EnumField.black._Title',
            title: 'black',
            descriptionId: '_Version.yoh-31._SchemaEnum.NavColor._EnumField.black._Description',
            description: 'black Description',
          },
        },
        {
          name: 'white',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.NavColor._EnumField.white._Title',
            title: 'white',
            descriptionId: '_Version.yoh-31._SchemaEnum.NavColor._EnumField.white._Description',
            description: 'white Description',
          },
        },
      ],
    },
  ],
};
export default form;
