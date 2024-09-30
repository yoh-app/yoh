
import React from 'react';
import { useRouter } from 'next/router';
import AdminGuard from 'guards/AdminGuard';
import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Grid, Button, Container, Box, Card, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
// @mui
import { alpha, styled } from '@mui/material/styles';
// routes
// hooks
import useResponsive from 'hooks/useResponsive';

import { useFindUniqueWebsiteQuery, usePermissionQuery, useStripeAccountStatusQuery } from 'generated';
import { useTranslation } from 'next-i18next'

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));



const SetupStripe = () => {
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

  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title='Setup Stripe'>
          <Container>
            <Button onClick={() => history.back()}>{'< '}{t('back')}</Button>
            {websiteData?.findUniqueWebsite?.paymentMethod === 'stripe' && stripeData?.stripeAccountStatus?.accountLink && stripeData?.stripeAccountStatus?.accountLink !== 'access'
              ? <>
                <Typography gutterBottom variant="h4" sx={{ color: 'text.primary' }}>
                  {t('product.setupStripe')}
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ color: 'text.primary' }}>
                  {t('product.stripeReminder')}
                </Typography>
                <a style={{ display: 'block' }} target='_blank' href={stripeData?.stripeAccountStatus?.accountLink?.url}>
                  <Button variant='outlined'>
                    {t('verify')}
                  </Button>
                </a>
              </> : <Typography gutterBottom variant="h4" sx={{ color: 'text.primary' }}>
                {t('setupComplete')}
              </Typography>}
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};

export default SetupStripe;



export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated'])),
    },
  };
};
