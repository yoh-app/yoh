import { FacebookIcon } from '@components/icons/facebook';
import { InstagramIcon } from '@components/icons/instagram';
import { TwitterIcon } from '@components/icons/twitter';
import { YouTubeIcon } from '@components/icons/youtube';
import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'yoh.app',
  description: '',
  logo: {
    url: '',
    alt: 'yoh.app',
    href: '/',
    width: 40,
    height: 40,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  product: {
    placeholderImage: '/product-placeholder.svg',
    cardMaps: {
      grocery: 'Krypton',
      furniture: 'Radon',
      bag: 'Oganesson',
      makeup: 'Neon',
      book: 'Xenon',
      medicine: 'Helium',
      default: 'Argon',
    },
  },
  headerLinks: [
    { href: ROUTES.SHOPS, icon: null, label: 'nav-menu-shops' },
    { href: ROUTES.OFFERS, icon: null, label: 'nav-menu-offer' },
    { href: ROUTES.HELP, label: 'nav-menu-faq' },
    { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
  ],
  paymentEnabledLinks: [
    { href: ROUTES.ORDERS, label: 'auth-menu-my-orders' },
    { href: ROUTES.REQUESTS, label: 'auth-menu-my-requests' },
  ],
  authorizedLinks: [
    // { href: ROUTES.PROFILE, label: "auth-menu-profile" },
    // { href: ROUTES.CHECKOUT, label: "auth-menu-checkout" },
    // { href: `${process.env.NEXT_PUBLIC_ADMIN_URL}/{locale}/admin`, label: 'auth-menu-profile' },
    // { href: ROUTES.ORDERS, label: 'auth-menu-my-orders' },
    // { href: ROUTES.REQUESTS, label: 'auth-menu-my-requests' },
    { href: ROUTES.LOGOUT, label: 'auth-menu-logout' },
  ],
  dashboardSidebarMenu: [
    {
      href: ROUTES.PROFILE,
      menulabel: 'profile-sidebar-profile',
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      menulabel: 'profile-sidebar-password',
    },
    {
      href: ROUTES.ORDERS,
      menulabel: 'profile-sidebar-orders',
    },
    {
      href: ROUTES.REQUESTS,
      menulabel: 'profile-sidebar-requests',
    },
    {
      href: ROUTES.HELP,
      menulabel: 'profile-sidebar-help',
    },
    {
      href: ROUTES.LOGOUT,
      menulabel: 'profile-sidebar-logout',
    },
    {
      href: ROUTES.LOGIN,
      menulabel: 'profile-sidebar-login',
    },
  ],
};
