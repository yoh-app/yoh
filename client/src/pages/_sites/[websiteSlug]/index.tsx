import HomeLayout from '@components/layout/home-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HtmlTag } from 'admin/src/components/craft/selectors/HtmlTag';
import { HtmlText } from 'admin/src/components/craft/selectors/HtmlText';
import { HtmlImg } from 'admin/src/components/craft/selectors/HtmlImg';
import { HtmlButton } from 'admin/src/components/craft/selectors/HtmlButton';
import { HtmlSection } from 'admin/src/components/craft/selectors/HtmlSection';
import { Collection } from 'admin/src/components/craft/selectors/Collection';
import { Embed } from 'admin/src/components/craft/selectors/Embed';
import { Root } from 'admin/src/components/craft/selectors/Root';
import { Editor, Frame } from '@craftjs/core';
import React, { useEffect } from 'react';
import prisma from 'admin/src/server/context/prisma';
import processPage from '@process/page';
import RequestBlockDesktop from '@components/request/request-block-desktop';
import RequestBlockMobile from '@components/request/request-block-mobile';
import { useFindManyRequestQuery } from '@generated';
import { useRouter } from 'next/router';
import { useWindowSize } from '@utils/use-window-size';
import processItem from '@process/item';
import { CraftProvider } from 'admin/src/components/craft/editor/CraftContext';
import processWebsite from '@process/website';
import { PageViewTracker } from '@components/pageViewTracker';
import { useSettings } from '@contexts/settings.context';
import { NextSeo } from 'next-seo';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useTranslation } from 'next-i18next';

export default function Home({ website, page }) {
  const size = useWindowSize();
  const [showRequests, setShowRequests] = React.useState(true);
  const isMobile = size.width < 768;
  const { requests, hasRequests } = useSettings()

  const { t } = useTranslation('common')
  const router = useRouter()
  if (router.isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  return (
    <>
      <NextSeo
        openGraph={{
          url: `https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`,
          title: website?.name,
          description: website?.description,
          images: [
            { url: website?.imageObj?.url },
          ],
          site_name: website?.name,
        }}
        title={website?.name}
        description={website?.description}
        canonical={`https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`}
      />
      {hasRequests && <RequestBlockDesktop showRequests={showRequests} requests={requests} />}
      <div
        style={
          hasRequests && !isMobile
            ? {
              width: 'calc(100% - 300px)',
              marginRight: '300px',
              // padding: '20px',
            }
            : hasRequests && isMobile
              ? {
                marginBottom: '170px',
              }
              : null
        }
      >
        <CraftProvider websiteData={website}>
          <Editor
            resolver={{
              HtmlTag,
              HtmlButton,
              HtmlText,
              HtmlSection,
              HtmlImg,
              Collection,
              Root,
              Embed,
            }}
            enabled={false}
          >
            <Frame data={page?.content}></Frame>
          </Editor>
        </CraftProvider>
      </div>
      {hasRequests && <RequestBlockMobile showRequests={showRequests} requests={requests} />}

      {page && <PageViewTracker page={page} />}
    </>
  );
}

export const getStaticPaths = async ({ locales }) => {
  // const websites = await prisma.website.findMany({
  //   where: {},
  // });
  // const paths = websites
  //   .map((website) =>
  //     locales.map((locale) => ({
  //       params: { websiteSlug: website.slug },
  //       locale, // Pass locale here
  //     })),
  //   )
  //   .flat();
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  // if (process.env.NODE_ENV === 'development') {
  //   params = {
  //     websiteSlug: 'www',
  //   }
  //   // params.websiteSlug = 'www'
  // }
  if (!params) throw new Error('No path parameters found');

  const { websiteSlug } = params;
  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug,
    },
    include: {
      pages: {
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          imageObj: true,
          isIndex: true,
          isExternalLink: true,
          externalUrl: true
        }
      },
    },
  });
  const page = website?.pages?.find((page) => page.isIndex);

  const indexPage = await prisma.page.findUnique({
    where: {
      id: page?.id
    }
  })
  if (!website || !indexPage)
    return {
      notFound: true,
      // revalidate: 10,
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      page: processPage({
        ...indexPage,
        website,
      }),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    // revalidate: 20,
  };
};
