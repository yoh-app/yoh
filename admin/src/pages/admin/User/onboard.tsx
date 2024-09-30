import React from 'react';
import Link from 'next/link';
import { Typography, Grid, Button, Card, CardContent, Container } from '@mui/material';
import { UserMenu } from 'layouts/admin/menuItem';

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
      <DashboardLayout menu={UserMenu}>
        <Page>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.User._AdminBanner.Create Websites._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Create Websites._Description')}
                        </Typography>
                        <Link href="/admin/User/Website/Website">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/create-website">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/userWebsite.svg" />
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
                          {t('_Admin.User._AdminBanner.Review Requests._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Review Requests._Description')}
                        </Typography>
                        <Link href="/admin/User/Request/Request">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/user-review-requests">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/userRequest.svg" />
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
                          {t('_Admin.User._AdminBanner.Review Orders._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Review Orders._Description')}
                        </Typography>
                        <Link href="/admin/User/Order/Order">
                          <Button style={{ marginBottom: '10px' }} variant="contained" to="#">
                            {t('_Version.yoh-31._Button.View._Title')}
                          </Button>
                        </Link>
                        <Link href="https://onboard.pixite.app/pages/user-review-orders">
                          <Button style={{ marginBottom: '10px' }} variant="outlined" to="#">
                            {t('_Version.yoh-31._Button.Tutorial._Title')}
                          </Button>
                        </Link>
                      </div>
                      <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '120px', marginLeft: '30px' }} src="/images/userOrder.svg" />
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
