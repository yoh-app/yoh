// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import TourPopover from './TourPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import {
  usePermissionQuery,
  useFindUniqueWebsiteQuery
} from 'generated'
import { useEffect } from 'react';
import { useEdition } from 'contexts/EditionContext';

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const { switchToPolygon, switchToRinkeby, connectToRinkeby, connectToPolygon } = useEdition()
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal();

  const { chain } = useNetwork()
  const { data: permissionData } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website,
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  const website = websiteData?.findUniqueWebsite


  // useEffect(() => {
  //   console.log(address, openConnectModal, 'outside')
  //   if (!address && openConnectModal) {
  //     console.log(address, openConnectModal)

  //     openConnectModal()
  //   }
  // }, [openConnectModal, address])

  // useEffect(() => {
  //   if (permissionData?.permission?.admin === 'Website') {
  //     if (!address) {
  //       if (website?.chain?.name === 'Rinkeby') {
  //         connectToRinkeby()
  //       } else if (website?.chain?.name === 'Polygon') {
  //         connectToPolygon()
  //       }
  //       window.location.reload()
  //     } else if (website?.chain?.name === 'Rinkeby' && chain?.name !== 'Rinkeby') {
  //       switchToRinkeby()
  //     } else if (website?.chain?.name === 'Polygon' && chain?.name !== 'Polygon') {
  //       switchToPolygon()
  //     }
  //   }
  // }, [website, address, chain, switchToRinkeby, switchToPolygon, permissionData])

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ marginRight: '20px' }} >
          <ConnectButton />

        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <TourPopover /> */}
          {permissionData?.permission?.admin === 'User' && <LanguagePopover />}
          {permissionData?.permission?.admin === 'Website' && <NotificationsPopover />}
          {/* <ContactsPopover /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
