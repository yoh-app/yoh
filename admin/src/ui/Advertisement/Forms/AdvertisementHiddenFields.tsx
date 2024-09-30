const form = {
  name: 'AdvertisementHiddenFields',
  intl: {
    titleId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._Form.AdvertisementHiddenFields._Title',
    title: 'AdvertisementHiddenFields',
    descriptionId:
      '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._Form.AdvertisementHiddenFields._Description',
    description: 'AdvertisementHiddenFields Description',
  },
  app: null,
  hideOn: { action: 'all' },
  disableOn: null,
  order: 4,
  formFields: [
    {
      name: 'advertisementStatus',
      custom: null,
      order: 100,
      hideOn: null,
      disableOn: null,
      requiredOn: null,
      fullWidth: true,
      inlineEdit: null,
      type: 'AdvertisementStatus',
      link: null,
      defaultValue: null,
      intl: {
        titleId:
          '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._Form.AdvertisementHiddenFields._FormField.advertisementStatus._Title',
        title: 'advertisementStatus',
        descriptionId:
          '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._Form.AdvertisementHiddenFields._FormField.advertisementStatus._Description',
        description: 'advertisementStatus Description',
      },
      isEnum: true,
      enumValues: [
        {
          name: 'active',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.active._Title',
            title: 'active',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.active._Description',
            description: 'active Description',
          },
        },
        {
          name: 'completed',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.completed._Title',
            title: 'completed',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.completed._Description',
            description: 'completed Description',
          },
        },
        {
          name: 'expired',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.expired._Title',
            title: 'expired',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.expired._Description',
            description: 'expired Description',
          },
        },
        {
          name: 'pending',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.pending._Title',
            title: 'pending',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.pending._Description',
            description: 'pending Description',
          },
        },
        {
          name: 'processing',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.processing._Title',
            title: 'processing',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.processing._Description',
            description: 'processing Description',
          },
        },
        {
          name: 'rejected',
          intl: {
            titleId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.rejected._Title',
            title: 'rejected',
            descriptionId: '_Version.yoh-0._SchemaEnum.AdvertisementStatus._EnumField.rejected._Description',
            description: 'rejected Description',
          },
        },
      ],
    },
  ],
};
export default form;
