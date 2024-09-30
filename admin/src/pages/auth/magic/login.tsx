// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
// hooks
// import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Logo from '../../../components/Logo';
import Image from '../../../components/Image';
// sections
import { Magic } from '../../../sections/auth/magic';
import dynamic from 'next/dynamic';

// i18n
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DynamicModalContainer = dynamic(() => import('server/magic/components/Modal/ModalContainer'));

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'linear-gradient(159.02deg, #D7D0FF 16.43%, #F8EEE7 91.45%)'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'generated'])),
    },
  };
};

export default function Login() {
  const { t } = useTranslation('login');
  // const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {/* {mdUp && (
            <SectionStyle>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                <img style={{ width: "200px"}} src="/logo/new-logo.svg" />
              </div>
              <Image
                src="/images/login.png"
                alt="login"
              />
            </SectionStyle>
          )} */}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {t('WebsiteAdmin.Login.welcome')}
                    {/* <span className="text-[14px] text-[#4B5971] font-normal ml-1">{t('WebsiteAdmin.Login.admin')}</span> */}
                  </Typography>
                </Box>
              </Stack>

              <Magic />

            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
      {/* <DynamicModalContainer /> */}
    </GuestGuard>
  );
}
