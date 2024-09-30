import React from 'react';
import Link from 'next/link';
import { Typography, Grid, Button, Card, CardContent, Container } from '@mui/material';
import { WebsiteMenu } from 'layouts/admin/menuItem';

import { styled } from '@mui/material/styles';
import DashboardLayout from 'layouts/admin';
import Page from 'components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdminGuard from 'guards/AdminGuard';

export default function AdminPage() {
  const { t } = useTranslation('generated');

  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.Website._AdminBanner.Design Website._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.Website._AdminBanner.Design Website._Description')}
                        </Typography>
                        <Link href="/admin/Website/Website/Menu">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/design-website">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/websiteOrganize.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.Website._AdminBanner.Utility Nfts._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.Website._AdminBanner.Utility Nfts._Description')}
                        </Typography>
                        <Link href="/admin/Website/Website/Product">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/utility-nfts">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/websiteProduct.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.Website._AdminBanner.Review Orders._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.Website._AdminBanner.Review Orders._Description')}
                        </Typography>
                        <Link href="/admin/Website/Website/Order">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/website-review-orders">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/websiteVault.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.Website._AdminBanner.Manage Requests._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.Website._AdminBanner.Manage Requests._Description')}
                        </Typography>
                        <Link href="/admin/Website/Website/Request">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/manage-requests">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/websiteRequest.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated'])),
    },
  };
};
