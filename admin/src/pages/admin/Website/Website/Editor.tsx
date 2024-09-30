import React, { useState, useEffect } from 'react';
// import { NextSeo } from 'next-seo';
import { Editor, Frame, Element } from '@craftjs/core';
// import { Container, Text } from 'components/craft/selectors';
import { createTheme } from '@mui/material/styles';

// import { Custom1, OnlyButtons } from 'components/craft/selectors/Custom1';
// import { Custom2, Custom2VideoDrop } from 'components/craft/selectors/Custom2';
// import { Custom3, Custom3BtnDrop } from 'components/craft/selectors/Custom3';
// import { Button } from 'components/craft/selectors/Button';
// import { Video } from 'components/craft/selectors/Video';
import { RenderNode } from 'components/craft/editor';
import { CraftProvider } from 'components/craft/editor/CraftContext';

import { Resource } from 'components/craft/selectors/Resource';
import { HtmlTag } from 'components/craft/selectors/HtmlTag';
import { HtmlButton } from 'components/craft/selectors/HtmlButton';
import { HtmlSection } from 'components/craft/selectors/HtmlSection';
import { HtmlImg } from 'components/craft/selectors/HtmlImg';
import { Collection } from 'components/craft/selectors/Collection';
import { Embed } from 'components/craft/selectors/Embed';
import { HtmlText } from 'components/craft/selectors/HtmlText';
import { Root } from 'components/craft/selectors/Root';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { CraftEditor } from 'components/craft/editor/CraftEditor';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  useFindUniquePageQuery,
  useUpdateOnePageMutation,
  useFindManyPageQuery,
  useFindUniqueWebsiteQuery,
  usePermissionQuery,
} from 'generated';
import { applyTheme } from 'client/src/themes/utils';
import DashboardLayout from 'layouts/admin';
import { useTranslation } from 'next-i18next';

import { WebsiteMenu } from 'layouts/admin/menuItem';
import ClientHeader from 'components/craft/editor/CraftEditor/ClientHeader';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import {
  Card,
  Box,
  Button,
  Container
} from '@mui/material';

import Page from 'components/Page';

import Spinner from 'admin/components/Spinner';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

function App() {
  const [enabled] = useState(true);
  const router = useRouter();
  const { data: permissionData } = usePermissionQuery();
  const { t } = useTranslation('design');

  const { data: websiteData } = useQuery(
    gql`
      query findUniqueWebsite($where: WebsiteWhereUniqueInput!) {
        findUniqueWebsite(where: $where) {
          id
          name
          slug
          menu
          description
          imageObj
          themeColor
          pages {
            id
            name
            slug
            navColor
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: permissionData?.permission?.Website,
        },
      },
      skip: !permissionData?.permission?.Website,
    },
  );
  const { data: pageData, refetch } = useFindManyPageQuery({
    variables: {
      where: {
        website: {
          id: {
            equals: permissionData?.permission?.Website,
          }
        },
        isIndex: {
          equals: true
        }
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  const page = pageData?.findManyPage?.[0]
  const [updatePage] = useUpdateOnePageMutation();

  const homeLink = '/admin/Website/Website/Menu';

  useEffect(() => {
    if (websiteData?.findUniqueWebsite?.themeColor) {
      applyTheme(websiteData?.findUniqueWebsite?.themeColor);
    } else {
      applyTheme('base');
    }
  }, [websiteData?.findUniqueWebsite?.themeColor]);

  return (
    <AdminGuard>
      {!page?.content && <Spinner />}
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Analytics | yoh.app">
          <Container>
            <div>
              <Typography variant='h4'>
                {/* {t('WebsiteAdmin.OnboardPage.onboardTitle')} */}
                Hi, Welcome to yoh.app
              </Typography>
              <Typography variant='body1' style={{ margin: '20px 0 20px 0' }}>
                {/* {t('WebsiteAdmin.OnboardPage.onboardDescription')} */}
                Start building your next blog, news, ideas, branding site and multimedia NFTs for online presence!
              </Typography>
            </div>

            {page?.content && <Card style={{
              //             position: 'absolute',
              // left: '40px',
              // top: '200px',
              position: 'relative',
              top: 0,
              // right: '-40px',
              // borderTop: '3px solid black',
              // borderLeft: '3px solid black',
              // boxShadow: '0 0 25px rgb(0 0 0 / 25%)',
              // borderRadius: '15px',
              height: '800px',
              // background: '#f7f7f7'
            }}>
              <Box sx={{ borderBottom: '1px solid black' }}>
                <Link href={process.env.NODE_ENV === 'production' ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}` : `http://www.awkns.local:3000/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}`}>
                  <Button size='large' style={{ borderRadius: '15px 0 0 0', height: '100px', borderRight: '1px solid black', width: '50%' }}>
                    {/* {t('WebsiteAdmin.OnboardPage.designPage')} */}
                    <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src='/images/websiteEditor.png' />
                    <Typography variant='body2'>Website Editor</Typography>
                  </Button>
                </Link>
                <Link href={process.env.NODE_ENV === 'production' ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}` : `http://www.awkns.local:3000/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}`}>
                  <Button size='large' sx={{ borderRadius: '0 15px 0 0', height: '100px', width: '50%' }}>
                    {/* {t('WebsiteAdmin.OnboardPage.designPage')} */}
                    <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src='/images/multimediaNFT.png' />
                    <Typography variant='body2'>Multimedia NFT</Typography>
                  </Button>
                </Link>

              </Box>
              <a target='_blank' href={`https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`}>
                <Button size='large' style={{ borderRadius: 0, borderBottom: '1px solid black', height: '60px', display: 'unset', textTransform: 'none', width: '100%' }}>
                  {/* <div>
                  <PreviewIcon />
                </div> */}
                  <Typography variant='body2'> https://{websiteData?.findUniqueWebsite?.slug}.{process.env.NEXT_PUBLIC_COOKIE_DOMAIN}</Typography>
                </Button>
              </a>
              <iframe style={{ width: '100%', height: '770px', background: 'white' }} src={process.env.NODE_ENV === 'production' ? `https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}` : 'http://www.awkns.local:3003'} />
              {/* 
          <CraftProvider
            permissionData={permissionData?.permission}
            websiteData={websiteData?.findUniqueWebsite}
            pageData={page}
            refetchPage={refetch}
            inEdit={true}
          >
            <Editor
              resolver={{
                Embed,
                Resource,
                HtmlTag,
                HtmlButton,
                HtmlText,
                HtmlSection,
                HtmlImg,
                Root,
                Collection,
              }}
              enabled={false}
              onRender={RenderNode}
            >
             
              <ClientHeader />

              <Frame data={page?.content} />
            </Editor>
          </CraftProvider> */}
            </Card>}
          </Container>
        </Page>
      </DashboardLayout></AdminGuard>

  );


}

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'design', 'generated'])),
    },
  };
};

export default App;
