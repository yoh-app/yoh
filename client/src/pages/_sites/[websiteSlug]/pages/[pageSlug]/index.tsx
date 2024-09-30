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
import React, { useState, useEffect } from 'react';
import prisma from 'admin/src/server/context/prisma';
import processPage from '@process/page';
import { Grid, Button as MuiButton, Card, CardHeader, CardContent, TextField, Typography } from '@mui/material';

import Link from 'next/link'

import RequestBlockDesktop from '@components/request/request-block-desktop';
import RequestBlockMobile from '@components/request/request-block-mobile';
import { useWindowSize } from '@utils/use-window-size';
import { Network, Alchemy } from "alchemy-sdk";
import { CraftProvider } from 'admin/src/components/craft/editor/CraftContext';
import processWebsite from '@process/website';
import { PageViewTracker } from '@components/pageViewTracker';
import { useSettings } from '@contexts/settings.context';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useTranslation } from 'next-i18next';
import { useAccount } from 'wagmi';

export default function Home({ page, website }: Record<string, any>) {
  console.log(
    page
  )
  const size = useWindowSize();
  const [showRequests, setShowRequests] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const isMobile = size.width < 768;
  const { requests, hasRequests, locked, loadingNFT, setPassword, setLocked, password } = useSettings()

  const { t } = useTranslation('common')
  const router = useRouter()



  if (router.isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }

  if (page?.password && locked) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography>{t('unlockPageWithPassword')}</Typography>
      <br />
      <TextField size='small' onChange={(e) => {
        setPassword(e.target.value)
      }} type='text' />
      <MuiButton size='large' onClick={() => {
        if (password === page.password) {
          setLocked(false)
        }
      }}>verify</MuiButton>
    </div>
  }

  if (page?.products && locked) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ marginBottom: '100px', fontSize: '20px' }}>{t('unlockPageWithNFT')}</h1>
        {loadingNFT ? <div className="flex justify-center items-center bg-light relative">
          <Spinner text='Loading' />
        </div> : <Grid style={{ padding: '20px' }} spacing={2} container justifyContent="center">
          {page.products.map((product) => {
            return <Link href={`/products/${product.slug}`}><Grid item xs={12} md={3}>
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundImage: `url('${product?.imageObj?.url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '14px',
                  backgroundColor: '#C1C1C1',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #ebebeb',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%)',
                  },
                }}
              >
                <CardHeader sx={{ paddingBottom: '75%' }} />
              </Card>
            </Grid>
            </Link>
          })}
        </Grid>}
      </div>
    );
  }

  return (
    <>
      <NextSeo
        openGraph={{
          url: `https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${page?.slug}`,
          title: page?.name,
          description: page?.description,
          images: [
            { url: website?.imageObj?.url },
            { url: page?.imageObj?.url },
          ],
          site_name: website?.name,
        }}
        title={page?.name}
        description={page?.description}
        canonical={`https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${page?.slug}`}
      />
      {hasRequests && <RequestBlockDesktop showRequests={true} requests={requests} />}
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
        {/* {page?.items?.slice(1).map((item: Record<string, any>, index: number) => renderSection(item, index))} */}
      </div>
      {hasRequests && <RequestBlockMobile showRequests={showRequests} requests={requests} />}
      {page && <PageViewTracker page={page} />}
    </>
  );
}

export const getStaticPaths = async ({ locales }) => {
  // const pages = await prisma.page.findMany({
  //   where: {},
  //   include: {
  //     website: true,
  //   },
  // });
  // const paths = pages
  //   .filter((page) => page.active && !page.deleted && page.website && page.website.active && !page.website.deleted)
  //   .map((page) =>
  //     locales.map((locale) => ({
  //       params: {
  //         pageSlug: page?.slug,
  //         websiteSlug: page?.website?.slug,
  //       },
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
  if (!params) throw new Error('No path parameters found');

  const { pageSlug, websiteSlug } = params;
  console.log(pageSlug, 'this is page slug')
  const page = await prisma.page.findUnique({
    where: {
      slug: pageSlug,
    },
    include: {
      website: true,
      products: true
    },
  });
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

  if (!page || !website)
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
      page: processPage(page),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    // revalidate: 20,
  };
};
