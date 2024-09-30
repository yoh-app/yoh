import { useSettings } from '@contexts/settings.context';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';

const DefaultSeo = () => {
  const settings = useSettings();
  return (
    <NextDefaultSeo
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        // {
        //   rel: 'apple-touch-icon',
        //   href: 'icons/favicon.png',
        // },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
      title={settings.siteTitle ?? 'yoh.app'}
      titleTemplate={`%s | ${settings?.seo?.metaTitle ?? 'yoh.app'}`}
      description={settings?.seo?.metaDescription || settings?.siteSubtitle}
      canonical={settings?.seo?.canonicalUrl}
      openGraph={{
        title: settings?.seo?.ogTitle,
        description: settings?.seo?.ogDescription,
        type: 'website',
        locale: 'en_US',
        site_name: settings?.siteTitle,
        images: [
          {
            url: settings?.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt: settings?.seo?.ogTitle,
          },
        ],
      }}
      twitter={{
        handle: settings?.seo?.twitterHandle,
        site: settings?.siteTitle,
        cardType: settings?.seo?.twitterCardType,
      }}
    />
  );
};

export default DefaultSeo;
