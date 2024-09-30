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
import { useRouter } from 'next/router'
export default function AdminPage() {
  const { t } = useTranslation('generated');
  const router = useRouter()
  return (
    <AdminGuard>
      <DashboardLayout menu={UserMenu}>
        <Page>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card style={{ height: '300px' }}>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '50%', flexDirection: 'column', height: '300px' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.User._AdminBanner.Create Websites._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Create Websites._Description')}
                        </Typography>
                        <Link href="/admin/User/Website/Website">
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="contained" to="#">
                            {t('_Version.yoh-2._Button.View._Title')}
                          </Button>
                        </Link>
                        <a target='blank' href={`https://document-${router?.locale}.yoh.app/pages/user-create-website-${router?.locale}`}>
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="outlined" to="#">
                            {t('_Version.yoh-2._Button.Tutorial._Title')}
                          </Button>
                        </a>
                      </div>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <img style={{ width: '200px', marginLeft: '30px' }} src="/images/userWebsite.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card style={{ height: '300px' }}>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.User._AdminBanner.Review Requests._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Review Requests._Description')}
                        </Typography>
                        <Link href="/admin/User/Request/Request">
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="contained" to="#">
                            {t('_Version.yoh-2._Button.View._Title')}
                          </Button>
                        </Link>
                        <a target='blank' href={`https://document-${router?.locale}.yoh.app/pages/user-manage-request-${router?.locale}`}>
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="outlined" to="#">
                            {t('_Version.yoh-2._Button.Tutorial._Title')}
                          </Button>
                        </a>
                      </div>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <img style={{ width: '200px', marginLeft: '30px' }} src="/images/userRequest.svg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card style={{ height: '300px' }}>
                  <CardContent>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h4">
                          {t('_Admin.User._AdminBanner.Review Orders._Title')}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                          {t('_Admin.User._AdminBanner.Review Orders._Description')}
                        </Typography>
                        <Link href="/admin/User/Order/Order">
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="contained" to="#">
                            {t('_Version.yoh-2._Button.View._Title')}
                          </Button>
                        </Link>
                        <a target='blank' target='blank' href={`https://document-${router?.locale}.yoh.app/pages/user-manage-order-${router?.locale}`}>
                          <Button style={{ marginBottom: '10px', width: '150px' }} variant="outlined" to="#">
                            {t('_Version.yoh-2._Button.Tutorial._Title')}
                          </Button>
                        </a>
                      </div>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <img style={{ width: '200px', marginLeft: '30px' }} src="/images/userOrder.svg" />
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
