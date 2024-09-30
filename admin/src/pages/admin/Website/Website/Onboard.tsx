import React, { useState, useEffect } from 'react';

import { createTheme } from '@mui/material/styles';



import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import { useQuery, useMutation, gql } from '@apollo/client';

import { applyTheme } from 'client/src/themes/utils';
import DashboardLayout from 'layouts/admin';
import { useTranslation } from 'next-i18next';
import { WebsiteMenu } from 'layouts/admin/menuItem';

import UtilityCard from 'sections/@dashboard/onboard/UtilityCard'
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ArticleIcon from '@mui/icons-material/Article';
import CollectionsIcon from '@mui/icons-material/Collections';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

import Page from 'components/Page';

import Spinner from 'admin/components/Spinner';


import { Grid, Button, Container, Tabs, Tab, Box, Card, Avatar, Typography, CardContent, Link, Stack, CardActions } from '@mui/material';

import NextLink from 'next/link';

import NftCarousel from 'sections/@dashboard/onboard/NftCarousel'


import {
  useUpdateOnePageMutation,
  useFindManyPageQuery, useFindUniqueWebsiteQuery, usePermissionQuery, useStripeAccountStatusQuery, useFindManyProductQuery
} from 'generated';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});
const utilities = [{
  id: 1,
  title: 'utility.video.title',
  description: 'utility.video.description',
  fileTypes: ['mp4'],
  Icon: VideoFileIcon,
  borderColor: 'red',
  linkTo: '/admin/Website/Website/Video'
},
{
  id: 2,
  title: 'utility.audio.title',
  description: 'utility.audio.description',
  fileTypes: ['mp3'],
  Icon: AudioFileIcon,
  borderColor: 'blue',
  linkTo: '/admin/Website/Website/Audio'
},
{
  id: 3,
  title: 'utility.document.title',
  description: 'utility.document.description',
  fileTypes: ['pdf', 'doc'],
  Icon: ArticleIcon,
  borderColor: 'purple',
  linkTo: '/admin/Website/Website/Document'
},
{
  id: 4,
  title: 'utility.picture.title',
  description: 'utility.picture.description',
  fileTypes: ['png', 'gif', 'jpeg'],
  Icon: CollectionsIcon,
  borderColor: 'green',
  linkTo: '/admin/Website/Website/Picture'
},
{
  id: 5,
  title: 'utility.link.title',
  description: 'utility.link.description',
  fileTypes: ['url'],
  Icon: DatasetLinkedIcon,
  borderColor: 'orange',
  linkTo: '/admin/Website/Website/Link'
},
{
  id: 5,
  title: 'utility.page.title',
  description: 'utility.page.description',
  fileTypes: ['page'],
  Icon: ArtTrackIcon,
  borderColor: 'yellow',
  linkTo: '/admin/Website/Website/Page'
}]
function App() {
  const [enabled] = useState(true);
  const router = useRouter();
  const { data: permissionData } = usePermissionQuery();
  const { t } = useTranslation('admin');

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

  const { data: productData } = useFindManyProductQuery({
    variables: {
      where: {
        website: {
          id: {
            equals: permissionData?.permission?.Website
          }
        }
      }
    },
    skip: !permissionData?.permission?.Website
  })
  const [tab, setTab] = useState(0)
  return (
    <AdminGuard>
      {!page?.content && <Spinner />}
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Analytics | yoh.app">
          <Container>
            <div style={{ marginBottom: '30px' }}>
              <Typography variant='h4'>
                {t('onboard.onboardTitle')}
                {/* Hi, Welcome to yoh.app */}
              </Typography>
              <Typography variant='body1' style={{ margin: '20px 0 20px 0' }}>
                {t('onboard.onboardDescription')}
                {/* Start building your next blog, news, ideas, branding site and multimedia NFTs for online presence! */}
              </Typography>
            </div>

            <Grid container spacing={3} style={{ marginBottom: '30px' }}>
              <Grid style={{ paddingTop: 0 }} item xs={12} md={6}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  {t('onboard.product.NFTIdeas')}
                </Typography>
                <NftCarousel />
              </Grid>
              <Grid style={{ paddingTop: 0 }} item xs={12} md={6}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  {/* {t('onboard.title.myNFT')} */}
                  {t('onboard.product.utilityNFT')}
                </Typography>
                <Card style={{ border: '1px solid lightgrey' }}>
                  {/* <Tabs value={tab} onChange={(e, index) => { setTab(index) }} >
                    <Tab label="NFT" />
                    <Tab label="Utilities" />
                  </Tabs> */}
                  <CardContent style={{ height: '290px', overflow: 'scroll', padding: 0 }}>
                    {/* <List>
                      {tab === 0 ? productData?.findManyProduct?.map((product) => {
                        return <NextLink href={`/admin/Website/Website/Product?view=${product.id}`}><a><ListItem sx={{
                          ":hover": {
                            background: '#f7f7f7'
                          }
                        }} secondaryAction={
                          <ListItemText primary={product?.isExternalNft ? product?.externalNftChain : 'Polygon'} secondary={product?.isExternalNft ? t('onboard.product.externalNFT') : t('onboard.product.yohNFT')} />
                        }>
                          <ListItemAvatar>
                            <img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={product?.imageObj?.url} />
                          </ListItemAvatar>
                          <ListItemText primary={product.name} secondary={product?.editionAddress ? t('onboard.product.ready') : t('onboard.product.pending')} />
                        </ListItem></a></NextLink>
                      }) : utilities?.map((utility) => {
                        return <NextLink href={`/admin/Website/Website/Product?view=${utility.linkTo}`}><a><ListItem sx={{
                          ":hover": {
                            background: '#f7f7f7'
                          }
                        }}>
                          <ListItemAvatar>
                            <utility.Icon></utility.Icon>
                          </ListItemAvatar>
                          <ListItemText primary={t(utility.title)} />
                        </ListItem></a></NextLink>
                      })}
                    </List> */}
                    <List>{productData?.findManyProduct?.map((product) => {
                      return <NextLink href={`/admin/Website/Website/Product?view=${product.id}`}><a><ListItem sx={{
                        ":hover": {
                          background: '#f7f7f7'
                        }
                      }} secondaryAction={
                        <ListItemText primary={product?.isExternalNft ? product?.externalNftChain : 'Polygon'} secondary={product?.isExternalNft ? t('onboard.product.externalNFT') : t('onboard.product.yohNFT')} />
                      }>
                        <ListItemAvatar>
                          <img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={product?.imageObj?.url} />
                        </ListItemAvatar>
                        <ListItemText primary={product.name} secondary={product?.editionAddress ? t('onboard.product.ready') : t('onboard.product.pending')} />
                      </ListItem></a></NextLink>
                    })}</List>
                  </CardContent>
                  <CardActions style={{ padding: 0, borderTop: '1px solid lightgrey' }}>
                    <NextLink href='/admin/Website/Website/Product'>
                      <Button size='large' sx={{ textTransform: 'none', borderRadius: '0 0 0 0' }} variant='contained'>{t('onboard.product.viewDetails')}</Button>
                    </NextLink>
                    {/* <Link href='/admin/Website/Website/Product?create=true'>
                      <Button variant='contained' size='large'>{t('onboard.product.create')}</Button>
                    </Link> */}
                  </CardActions>
                </Card>
                {/* <Typography sx={{ my: 2 }} variant='h3'>{t('onboard.title.myWebsite')}</Typography>
<WebsiteIntro /> */}
              </Grid>


            </Grid>
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
              <Box sx={{ borderBottom: '1px solid lightgrey' }}>
                <Link href={process.env.NODE_ENV === 'production' ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}` : `http://www.yoh.local:3000/${router?.locale}/admin/Website/Website/DesignPage?id=${page?.id}`}>
                  <Button variant='contained' size='large' style={{ borderRadius: '5px 0 0 0', borderRight: '1px solid lightgrey', width: '20%' }}>
                    {t('onboard.editor')}
                  </Button>
                </Link>
                {/* <Button size='large' style={{ borderRadius: 0, borderBottom: '1px solid lightgrey', height: '60px', display: 'unset', textTransform: 'none', width: '100%' }}> */}
                {/* <div>
                  <PreviewIcon />
                </div> */}
                {/* <Typography variant='body2'>{t('onboard.preview')}: https://{websiteData?.findUniqueWebsite?.slug}.{process.env.NEXT_PUBLIC_COOKIE_DOMAIN}</Typography> */}
                {/* </Button> */}
                <a target='_blank' href={process.env.NODE_ENV === 'production' ? `https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}` : 'http://www.yoh.local:3003'}>
                  <Button size='large' sx={{ textTransform: 'none', borderRadius: '0 5px 0 0', width: '80%' }}>
                    {t('onboard.preview')}: https://{websiteData?.findUniqueWebsite?.slug}.{process.env.NEXT_PUBLIC_COOKIE_DOMAIN}
                  </Button>
                </a>

              </Box>
              {/* <a target='_blank' href={`https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`}>
                <Button size='large' style={{ borderRadius: 0, borderBottom: '1px solid lightgrey', height: '60px', display: 'unset', textTransform: 'none', width: '100%' }}>
 
                  <Typography variant='body2'>{t('onboard.preview')}: https://{websiteData?.findUniqueWebsite?.slug}.{process.env.NEXT_PUBLIC_COOKIE_DOMAIN}</Typography>
                </Button>
              </a> */}
              <iframe style={{ width: '100%', height: '800px', background: 'white' }} src={process.env.NODE_ENV === 'production' ? `https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}` : 'http://www.yoh.local:3003'} />
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
