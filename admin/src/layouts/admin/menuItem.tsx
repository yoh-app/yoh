import SvgIconStyle from 'components/SvgIconStyle';

const getIcon = (name: string) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const ICONS = {
  // onboard: getIcon('onboard'),
  notification: getIcon('notification'),
  setting: getIcon('setting'),

  null: getIcon('null'),
  onboard: getIcon('onboard'),
  analytics: getIcon('analytics'),
  editor: getIcon('editor'),
  product: getIcon('product'),
  media: getIcon('media'),
  order: getIcon('order'),
  request: getIcon('request'),
  customer: getIcon('customer'),
  customer: getIcon('customer'),
  null: getIcon('null'),
  website: getIcon('website'),
};
export const WebsiteMenu = [
  //   {
  //   subheader: 'General',
  //   items: [{
  //     title: 'Onboard',
  //     intlId: "_Admin._PageGroup.Onboard._Title",
  //     icon: ICONS.onboard,
  //     path: "/admin/Website/Website/Onboard"
  //   }]
  // },
  {
    subheader: 'Manage',
    items: [
      {
        title: 'Onboard',
        icon: ICONS.onboard,
        intlId: '_Admin.Website._PageGroup.Onboard._Title',
        app: null,
        path: '/admin/Website/Website/Onboard',
      },
      {
        title: 'Analytics',
        icon: ICONS.analytics,
        intlId: '_Admin.Website._PageGroup.Analytics._Title',
        app: null,
        path: '/admin/Website/Website/Analytics',
      },
      {
        title: 'Editor',
        icon: ICONS.editor,
        intlId: '_Admin.Website._PageGroup.Editor._Title',
        app: null,
        path: '/admin/Website/Website/DesignPage',
      },
      {
        title: 'Product Management',
        icon: ICONS.product,
        intlId: '_Admin.Website._PageGroup.Product Management._Title',
        app: null,
        children: [
          {
            title: 'Product',
            app: null,
            intlId: '_Admin.Website._PageGroup.Product Management._Page.Product._Title',
            path: '/admin/Website/Website/Product',
          },
          {
            title: 'Coupon',
            app: null,
            intlId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._Title',
            path: '/admin/Website/Website/Coupon',
          },
        ],
      },
      {
        title: 'Media',
        icon: ICONS.media,
        intlId: '_Admin.Website._PageGroup.Media._Title',
        app: null,
        children: [
          {
            title: 'Page',
            app: null,
            intlId: '_Admin.Website._PageGroup.Media._Page.Page._Title',
            path: '/admin/Website/Website/Page',
          },
          {
            title: 'Video',
            app: null,
            intlId: '_Admin.Website._PageGroup.Media._Page.Video._Title',
            path: '/admin/Website/Website/Video',
          },
        ],
      },
      {
        title: 'Order',
        icon: ICONS.order,
        intlId: '_Admin.Website._PageGroup.Order._Title',
        app: null,
        path: '/admin/Website/Website/Order',
      },
      {
        title: 'Request',
        icon: ICONS.request,
        intlId: '_Admin.Website._PageGroup.Request._Title',
        app: null,
        children: [
          {
            title: 'Request',
            app: null,
            intlId: '_Admin.Website._PageGroup.Request._Page.Request._Title',
            path: '/admin/Website/Website/Request',
          },
          {
            title: 'Affiliate',
            app: null,
            intlId: '_Admin.Website._PageGroup.Request._Page.Affiliate._Title',
            path: '/admin/Website/Website/Affiliate',
          },
        ],
      },
      {
        title: 'Customer',
        icon: ICONS.customer,
        intlId: '_Admin.Website._PageGroup.Customer._Title',
        app: null,
        path: '/admin/Website/Website/Customer',
      },
    ],
  },
  {
    subheader: 'Settings',
    items: [
      {
        title: 'Website',
        intlId: '_Admin._PageGroup.Settings.Website_Title',
        icon: ICONS.setting,
        path: '/admin/Website',
      },
      {
        title: 'Notification',
        intlId: '_Admin._PageGroup.Notification._Title',
        icon: ICONS.notification,
        path: '/admin/notifications',
      },
    ],
  },
];
export const UserMenu = [
  //   {
  //   subheader: 'General',
  //   items: [{
  //     title: 'Onboard',
  //     intlId: "_Admin._PageGroup.Onboard._Title",
  //     icon: ICONS.onboard,
  //     path: "/admin/User/onboard"
  //   }]
  // },
  {
    subheader: 'Manage',
    items: [
      {
        title: 'Website',
        icon: ICONS.website,
        intlId: '_Admin.User._PageGroup.Website._Title',
        app: null,
        path: '/admin/User/Website/Website',
      },
    ],
  },
];
