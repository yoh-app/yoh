import { useSnackbar } from 'notistack';
import { useRef, useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import {
  usePermissionQuery,
  useLogoutAdminMutation,
  useLogoutMutation,
  useFindUniqueWebsiteQuery,
} from 'generated';
import { setSession } from '../../../utils/jwt';
import { useTranslation } from 'next-i18next'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_LANDING_URL : 'https://www.yoh.app',
  },
  // {
  //   label: 'Profile',
  //   linkTo: PATH_DASHBOARD.user.profile,
  // },
  // {
  //   label: 'Settings',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const anchorRef = useRef(null);

  const { user, actions } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [logoutAdmin] = useLogoutAdminMutation();
  const [logout] = useLogoutMutation();
  const { data } = usePermissionQuery();
  const permission = data?.permission;
  const { t } = useTranslation('admin');

  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permission?.Website,
      },
    },
    skip: !permission?.Website,
  });

  // useEffect(() => {
  //   if (websiteData?.findUniqueWebsite?.slug && MENU_OPTIONS.length === 1) {
  //     MENU_OPTIONS.push({
  //       label: 'My Site',
  //       linkTo:
  //         process.env.NODE_ENV === 'production'
  //           ? `https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
  //           : `http://${websiteData?.findUniqueWebsite?.slug}.awkns.local:3003`,
  //     });
  //   }
  // }, [websiteData]);
  const handleLogout = async () => {
    try {
      await logout();

      if (process.env.NEXT_PUBLIC_AUTH === 'magic') {
        await actions?.logout();
      }

      if (isMountedRef.current) {
        router.push('/auth/magic/login/');
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar permission={permission} />
      </IconButtonAnimate>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {/* <Typography variant="subtitle1" noWrap>
            {user?.displayName}
          </Typography> */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        {/* {permission?.adminParent && (
          <>
            <MenuItem
              onClick={async () => {
                const { data } = await logoutAdmin();
                const token = data?.logoutAdmin?.token;
                setSession(token);
                window.location.assign(`/${router.locale}/admin`);
              }}
              sx={{ typography: 'body2' }}
            >
              Back to {permission?.adminParent}
            </MenuItem>
            <Divider />
          </>
        )} */}
        {/* {MENU_OPTIONS.map((option) => (
          <div key={option.label}>
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem onClick={handleClose} sx={{ typography: 'body2' }}>
                {option.label}
              </MenuItem>
            </NextLink>
            <Divider />
          </div>
        ))}
        {permission?.admin === 'Website' && (
          <>
            <NextLink href={`/admin/${permission.admin}`}>
              <MenuItem sx={{ typography: 'body2' }}>{permission?.admin} Settings</MenuItem>
            </NextLink>
            <Divider />
          </>
        )} */}
        <div>
          <NextLink href={process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_LANDING_URL : 'https://www.yoh.app'} passHref>
            <MenuItem onClick={handleClose} sx={{ typography: 'body2' }}>
              {t('home')}
            </MenuItem>
          </NextLink>
          <Divider />
        </div>
        <MenuItem onClick={handleLogout} sx={{ typography: 'body2' }}>
          {t('logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
