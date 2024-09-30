import { useState, ReactNode } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import NavbarHorizontal from './navbar/NavbarHorizontal';
import { useRouter } from 'next/router'
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';
import { Grid, Button, Container, Box, Card, Chip, Avatar, Typography, CardContent, Link, Stack, CardActions } from '@mui/material';
import NextLink from 'next/link';

import { useFindUniqueWebsiteQuery, usePermissionQuery, useStripeAccountStatusQuery, useFindManyProductQuery } from 'generated';
import { useTranslation } from 'next-i18next'

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

// const is100VHView = (pathname) => {
//   const pathnameArray = pathname.split('/')
//   if (pathname.includes('view') || pathname.includes('update')) {
//     return false
//   }
//   if (pathnameArray.length === 3 && pathnameArray[2] === 'admin') {
//     return false
//   }
//   // if (pathnameArray === '')
//   // if (pathname.includes('notifications') || pathname.includes('onboard') || pathname.includes('Menu')) {
//   //   return false
//   // }
//   return true
// }

export default function DashboardLayout({ children, menu }: Props) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { pathname } = useRouter()
  const { themeLayout } = useSettings();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);
  const verticalLayout = themeLayout === 'vertical';



  // const height = !is100VHView(pathname) ? '100%' : '100vh'
  const MainStyle = styled('main', {
    shouldForwardProp: (prop) => prop !== 'collapseClick',
  })<MainStyleProps>(({ collapseClick, theme }) => ({
    // background: pathname?.includes('Onboard') ? '' : 'linear-gradient(159.02deg, #D7D0FF 16.43%, #F8EEE7 91.45%)',
    // temporary hack for BasicEditRecord background glitch on material ui masonry component
    height: '100%',
    // height: query?.view || query?.update ? undefined : '100vh',
    // background:
    //   'radial-gradient(70% 70% at 50% 50%, rgb(140 81 228 / 30%) 0%, rgba(227, 174, 51, 0) 100%)',
    // background: '#f7f7f7',
    flexGrow: 1,
    paddingTop: HEADER.MOBILE_HEIGHT + 24,
    paddingBottom: pathname?.includes('Onboard') ? 0 : HEADER.MOBILE_HEIGHT + 24,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
      paddingBottom: pathname?.includes('Onboard') ? 0 : HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
      width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
      transition: theme.transitions.create('margin-left', {
        duration: theme.transitions.duration.shorter,
      }),
      ...(collapseClick && {
        marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
      }),
    },
  }));


  if (verticalLayout) {
    return (
      <>
        <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

        {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        )}

        <Box
          component="main"
          sx={{
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
            },
            pb: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
            },
          }}
        >
          {children}
        </Box>
      </>
    );
  }
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
  const { t } = useTranslation('admin')

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      <NavbarVertical menu={menu} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <ThemeProvider>
        <ThemeColorPresets>
          <MainStyle collapseClick={collapseClick}>
            {permissionData?.permission?.admin === 'Website' && <Stack style={{ marginBottom: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} direction="column" spacing={2}>
              {websiteData?.findUniqueWebsite?.paymentMethod === 'stripe' && stripeData?.stripeAccountStatus?.accountLink && stripeData?.stripeAccountStatus?.accountLink !== 'access'
                && <a style={{ display: 'block' }} target='_blank' href='/admin/Website/Website/SetupStripe'>
                  <Chip style={{ width: '100%' }} color='info' onClick={() => { }} label={t('product.setupStripe')} />
                </a>}
              {!websiteData?.findUniqueWebsite?.walletAddress && <NextLink href='/admin/Website/Website/SetupWallet'>
                <Chip color='warning' onClick={() => { }} label={t('product.setupWallet')} />
              </NextLink>}
            </Stack>}
            {children}</MainStyle>
        </ThemeColorPresets>
      </ThemeProvider>
    </Box>
  );
}
