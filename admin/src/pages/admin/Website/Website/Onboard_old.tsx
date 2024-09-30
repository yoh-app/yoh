
import React from 'react';
import { useRouter } from 'next/router';
import AdminGuard from 'guards/AdminGuard';
import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Grid, Button, Container, Box, Card, Avatar, Typography, CardContent, Link, Stack, CardActions } from '@mui/material';

import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
// routes
// hooks
import useResponsive from 'hooks/useResponsive';
// utils
import { fDate } from 'utils/formatTime';
import { fShortenNumber } from 'utils/formatNumber';
// @types
// components
import Image from 'components/Image';
import Iconify from 'components/Iconify';
import TextMaxLine from 'components/TextMaxLine';
import SvgIconStyle from 'components/SvgIconStyle';
import TextIconLabel from 'components/TextIconLabel';
import {
  AppWelcome,
  AppFeatured,
} from 'sections/@dashboard/general/app';
import AttachmentWidget from 'sections/@dashboard/nft/AttachmentWidget'
import WebsiteIntro from 'sections/@dashboard/onboard/WebsiteIntro'
import NftCarousel from 'sections/@dashboard/onboard/NftCarousel'

import UtilityCard from 'sections/@dashboard/onboard/UtilityCard'
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ArticleIcon from '@mui/icons-material/Article';
import CollectionsIcon from '@mui/icons-material/Collections';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

import Chip from '@mui/material/Chip';

import { useFindUniqueWebsiteQuery, usePermissionQuery, useStripeAccountStatusQuery, useFindManyProductQuery } from 'generated';
import { useTranslation } from 'next-i18next'


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';


const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));



const Onboard = () => {
  const router = useRouter();
  const isDesktop = useResponsive('up', 'sm');

  const { t } = useTranslation('admin')

  const { data: permissionData } = usePermissionQuery()
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website
      }
    },
    skip: !permissionData?.permission?.Website
  })
  const { data: stripeData } = useStripeAccountStatusQuery()
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
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title='Onboard'>
          <Container>
            {/* <Stack style={{ marginBottom: '30px' }} direction="column" spacing={2}>
              {websiteData?.findUniqueWebsite?.paymentMethod === 'stripe' && stripeData?.stripeAccountStatus?.accountLink && stripeData?.stripeAccountStatus?.accountLink !== 'access'
                && <a style={{ display: 'block' }} target='_blank' href='/admin/Website/Website/SetupStripe'>
                  <Chip style={{ width: '100%' }} color='info' onClick={() => { }} label={t('product.setupStripe')} />
                </a>}
              {!websiteData?.findUniqueWebsite?.walletAddress && <NextLink href='/admin/Website/Website/SetupWallet'>
                <Chip color='warning' onClick={() => { }} label={t('product.setupWallet')} />
              </NextLink>}

            </Stack> */}
            <Typography variant='h4'>Multimedia NFT Overview</Typography>
            <Typography sx={{ my: 5, color: 'gray' }} variant='body1'>Multimedia NFT is a form of NFT that allows users to embed multiple multimedias like videos, audios, links, documents, pictures, and pages from yoh.app in the NFT as the NFT holder's exclusive contents. Users can also import NFTs from outside of the app to use the serivce as well.</Typography>

            <Grid container spacing={3} >
              <Grid style={{ paddingTop: 0 }} item xs={12} md={6}>
                <Typography sx={{ my: 2 }} variant='h5'>
                  {/* {t('onboard.title.myNFT')} */}
                  My Multimedia NFTs
                </Typography>

                <Card style={{ border: '1px solid black' }}>
                  <CardContent style={{ height: '290px', overflow: 'scroll', paddingLeft: 0, paddingRight: 0 }}>
                    <List>
                      {productData?.findManyProduct?.map((product) => {
                        return <ListItem sx={{
                          ":hover": {
                            background: '#f7f7f7'
                          }
                        }} secondaryAction={
                          <ListItemText primary={product?.isExternalNft ? product?.externalNftChain : 'Polygon'} secondary={product?.isExternalNft ? 'External NFT' : 'yoh.app NFT'} />
                        }>
                          <ListItemAvatar>
                            <img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={product?.imageObj?.url} />
                          </ListItemAvatar>
                          <ListItemText primary={product.name} secondary={product?.editionAddress ? 'Ready' : 'Pending'} />

                        </ListItem>
                      })}
                    </List>
                  </CardContent>
                  <CardActions style={{ height: '60px', borderTop: '1px solid black' }}>
                    <Link href='/admin/Website/Website/Product'>
                      <Button variant='outlined' size='large'>View Details</Button>
                    </Link>
                    <Link href='/admin/Website/Website/Product?create=true'>
                      <Button variant='contained' size='large'>Create</Button>
                    </Link>
                  </CardActions>
                </Card>
                {/* <Typography sx={{ my: 2 }} variant='h3'>{t('onboard.title.myWebsite')}</Typography>
<WebsiteIntro /> */}
              </Grid>
              <Grid style={{ paddingTop: 0 }} item xs={12} md={6}>
                <Typography sx={{ my: 2 }} variant='h5'>
                  {/* {t('onboard.title.NFTIdeas')} */}
                  Multimedia NFT Ideas
                </Typography>
                <NftCarousel />
              </Grid>

            </Grid>
            <Typography className='py-5' variant='h5'>
              {/* {t('onboard.title.digitalAssets')} */}
              Multimedia
            </Typography>
            <Grid container spacing={3}>
              {utilities?.map((utility, index) => {
                return <Grid item xs={6} sm={4} md={3}><UtilityCard utility={utility} index={index} /></Grid>
              })}
            </Grid>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};

export default Onboard;



export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated'])),
    },
  };
};
