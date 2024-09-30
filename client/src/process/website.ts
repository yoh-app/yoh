import { processImage } from './media';

const processWebsite = (website) => {
  const menu = website?.menu?.columnOrder?.map(columnId => {
    const column = website?.menu?.columns?.find((column) => column?.id === columnId)

    const menuItem = {
      ...column,
      label: column.name,
      pages: column?.cardIds?.filter((cardId) => website?.pages?.find((_page) => _page.id === cardId)).map((cardId) => {
        const page = website?.pages?.find((_page) => _page.id === cardId)
        return {
          isExternalLink: page?.isExternalLink,
          externalUrl: page?.externalUrl,
          id: page.id,
          label: page.name,
          href: page?.isExternalLink && page?.externalUrl ? page?.externalUrl : `/pages/${page.slug}`,
          slug: page.slug
        };
      })
    }
    return menuItem
  });
  const indexPage = website?.pages?.find((page) => page.isIndex)
  const websiteSettings = {
    walletAddress: website?.walletAddress,
    paymentMethod: website?.paymentMethod,
    id: website?.id,
    indexPageSlug: indexPage?.slug,
    websiteSlug: website?.slug,
    siteTitle: website?.name,
    siteSubtitle: website?.description,
    currency: website?.currencyCode ? website?.currencyCode : 'usd',
    deliveryTime: [],
    logo: processImage(website?.imageObj),
    taxClass: {},
    shippingClass: {},
    seo: {
      metaTitle: website?.name,
      metaDescription: website?.description,
      ogTitle: website?.name,
      ogDescription: website?.description,
      ogImage: {
        id: website?.id,
        thumbnail: website?.imageObj?.url,
        original: website?.imageObj?.url,
      },
      twitterHandle: website?.twitterHandle,
      twitterCardType: website?.twitterCardType,
      metaTags: website?.metaTags,
      canonicalUrl: website?.canonicalUrl,
    },
    google: {
      isEnable: website?.googleIsEnable,
      tagManagerId: website?.googleTagManagerId,
    },
    facebook: {
      isEnable: website?.facebookIsEnable,
      appId: website?.facebookAppId,
      pageId: website?.facebookPageId,
    },
    themeColor: website?.themeColor,
    ...website,
    menu,
  };
  return JSON.parse(JSON.stringify(websiteSettings));
};

export default processWebsite;
