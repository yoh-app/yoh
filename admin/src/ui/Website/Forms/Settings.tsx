const form = {
  name: 'Settings',
  intl: {
    titleId: '_Admin.Website._PageGroup.Website._Page.Website._Form.Settings._Title',
    title: 'Settings',
    descriptionId: '_Admin.Website._PageGroup.Website._Page.Website._Form.Settings._Description',
    description: 'Settings Description',
  },
  app: null,
  hideOn: null,
  disableOn: null,
  order: 6,
  formFields: [
    {
      name: 'languageCode',
      custom: null,
      order: 3,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'LanguageCode',
      link: null,
      defaultValue: null,
      intl: {
        titleId: '_Admin.Website._PageGroup.Website._Page.Website._Form.Settings._FormField.languageCode._Title',
        title: 'languageCode',
        descriptionId:
          '_Admin.Website._PageGroup.Website._Page.Website._Form.Settings._FormField.languageCode._Description',
        description: 'languageCode Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'en',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.LanguageCode._EnumField.en._Title',
            title: 'en',
            descriptionId: '_Version.yoh-31._SchemaEnum.LanguageCode._EnumField.en._Description',
            description: 'en Description',
          },
        },
        {
          name: 'zh',
          intl: {
            titleId: '_Version.yoh-31._SchemaEnum.LanguageCode._EnumField.zh._Title',
            title: 'zh',
            descriptionId: '_Version.yoh-31._SchemaEnum.LanguageCode._EnumField.zh._Description',
            description: 'zh Description',
          },
        },
      ],
    },
  ],
};
export default form;
