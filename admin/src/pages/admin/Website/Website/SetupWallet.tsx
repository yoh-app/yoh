
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminGuard from 'guards/AdminGuard';
import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Grid, Button, Container, Box, Card, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';

// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
// routes
// hooks
import useResponsive from 'hooks/useResponsive';

import Spinner from 'admin/components/Spinner';

import { useFindUniqueWebsiteQuery, usePermissionQuery, useUpdateOneWebsiteMutation, useStripeAccountStatusQuery } from 'generated';
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
  const [loading, setLoading] = useState(false);

  const { data: permissionData } = usePermissionQuery()
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website
      }
    },
    skip: !permissionData?.permission?.Website
  })
  const { data: stripeData } = useStripeAccountStatusQuery({
    skip: websiteData?.findUniqueWebsite?.paymentMethod !== 'stripe'
  });
  const [updateWebsite] = useUpdateOneWebsiteMutation();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title='Setup Stripe'>
          <Container>
            <Button onClick={() => history.back()}>{'< '}{t('back')}</Button>

            <Stack style={{ marginBottom: '30px' }} direction="column" spacing={2}>
              {!websiteData?.findUniqueWebsite?.walletAddress ?
                <Typography gutterBottom variant="h4" sx={{ color: 'text.primary' }}>
                  {t('product.setupWallet')}
                </Typography>
                : <Typography gutterBottom variant="h4" sx={{ color: 'text.primary' }}>
                  {t('setupComplete')}
                </Typography>}
              {websiteData?.findUniqueWebsite?.chain && websiteData?.findUniqueWebsite?.walletAddress ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {websiteData?.findUniqueWebsite?.chain?.hasIcon && (
                      <div
                        style={{
                          background: websiteData?.findUniqueWebsite?.chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {websiteData?.findUniqueWebsite?.chain?.iconUrl && (
                          <img
                            alt={websiteData?.findUniqueWebsite?.chain.name ?? 'Chain icon'}
                            src={websiteData?.findUniqueWebsite?.chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {websiteData?.findUniqueWebsite?.chain.name}
                  </div>
                  <div>
                    <a target="_blank" href={`https://polygonscan.com/address/${websiteData?.findUniqueWebsite?.walletAddress}`}>
                      <Button>{websiteData?.findUniqueWebsite?.walletAddress}</Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  {loading && <Spinner />}
                  {!address && <Typography gutterBottom variant="body1" style={{ color: 'red' }}>{t('connectWallet')}</Typography>}
                  {chain?.name !== 'Polygon' && (
                    <Typography gutterBottom variant="body1" sx={{ color: 'red' }}>
                      {t('switchChain')}
                    </Typography>
                  )}
                  {address && chain?.name === 'Polygon' && (
                    <>
                      <Typography style={{ marginTop: '5px', marginBottom: '5px' }} variant="body1">
                        {t('connectedWallet')}: {address}
                      </Typography>
                      <Typography style={{ color: 'red' }} variant="body1">
                        {t('walletSaveAgain')}
                      </Typography>
                    </>
                  )}
                  <div style={{ display: 'flex', marginTop: '10px' }}>
                    {address && chain?.name === 'Polygon' && (
                      <Button
                        style={{ marginLeft: '10px' }}
                        onClick={async () => {
                          if (chain?.name === 'Polygon' && !chain?.iconUrl) {
                            chain.iconUrl =
                              'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjODI0N0U1IiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOC4yOCAxMC45MmExLjA2IDEuMDYgMCAwIDAtMS4wNiAwbC0yLjQxIDEuNDItMS42NS45My0yLjQxIDEuNDNjLS4zMS4xOS0uNzIuMTktMS4wNiAwbC0xLjkyLTEuMTJhMS4wNyAxLjA3IDAgMCAxLS41My0uOXYtMi4yYTEgMSAwIDAgMSAuNTMtLjlsMS45LTEuMDhjLjMtLjE4LjctLjE4IDEuMDQgMGwxLjkgMS4wOWMuMy4xOC41Mi41Mi41Mi45djEuNDJsMS42NC0uOTZWOS41MmExIDEgMCAwIDAtLjUyLS45bC0zLjUtMi4wNGExLjA2IDEuMDYgMCAwIDAtMS4wNiAwTDYuMTMgOC42M2ExIDEgMCAwIDAtLjUzLjl2NC4xMmExIDEgMCAwIDAgLjUzLjlsMy41NiAyLjA0Yy4zMS4xOS43MS4xOSAxLjA2IDBsMi40MS0xLjQgMS42NS0uOTUgMi40MS0xLjRjLjMxLS4xOS43Mi0uMTkgMS4wNiAwbDEuODkgMS4wOWMuMy4xOC41My41Mi41My45djIuMmExIDEgMCAwIDEtLjUzLjlsLTEuOSAxLjExYy0uMy4xOS0uNy4xOS0xLjA1IDBsLTEuODktMS4wOGExLjA3IDEuMDcgMCAwIDEtLjUyLS45di0xLjQzbC0xLjY1Ljk2djEuNDNhMSAxIDAgMCAwIC41My45bDMuNTYgMi4wNGMuMzEuMTkuNzIuMTkgMS4wNiAwbDMuNTYtMi4wNGMuMzEtLjE5LjUzLS41My41My0uOXYtNC4xM2ExIDEgMCAwIDAtLjUzLS45bC0zLjYtMi4wN1oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB4Mj0iMTQiIHkxPSIwIiB5Mj0iMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K';
                            chain.hasIcon = true;
                          }
                          setLoading(true);
                          await updateWebsite({
                            variables: {
                              where: {
                                id: permissionData?.permission?.Website,
                              },
                              data: {
                                walletAddress: { set: address },
                                chain,
                              },
                            },
                          });
                          setLoading(false);
                          // window.location.assign('/admin')
                          // window.location.reload()
                        }}
                        variant="contained"
                      >
                        {t('save')}
                      </Button>
                    )}
                  </div>
                </div>

              )}
            </Stack>
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
