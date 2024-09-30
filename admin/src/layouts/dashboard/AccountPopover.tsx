import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import starFill from '@iconify/icons-eva/star-fill';

import backFill from '@iconify/icons-eva/arrow-back-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
// next
import NextLink from 'next/link';
// material
import { alpha } from '@mui/material/styles';
import { Box, Avatar, Button, Divider, MenuItem, Typography } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import {
  usePermissionQuery,
  useLogoutAdminMutation,
  useLogoutMutation,
  useFindUniqueWebsiteQuery,
} from 'generated';
import useAuth from '../../hooks/useAuth';
import { setSession } from '../../utils/jwt';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: 'Home', icon: homeFill, linkTo: '/' },
  // { label: 'Profile', icon: personFill, linkTo: '#' },
  // { label: 'Settings', icon: settings2Fill, linkTo: '#' },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const { push, locale } = useRouter();
  const [open, setOpen] = useState(false);

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const [logoutAdmin] = useLogoutAdminMutation();
  const [logout] = useLogoutMutation();
  const { data } = usePermissionQuery();
  const permission = data?.permission;

  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permission?.Website,
      },
    },
    skip: !permission?.Website,
  });

  useEffect(() => {
    if (websiteData?.findUniqueWebsite?.slug && MENU_OPTIONS.length === 1) {
      MENU_OPTIONS.push({
        label: 'My Site',
        icon: starFill,
        linkTo:
          process.env.NODE_ENV === 'production'
            ? `https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
            : `http://${websiteData?.findUniqueWebsite?.slug}.awkns.local:3003`,
      });
    }
  }, [websiteData]);

  const { user, actions } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    try {
      if (process.env.NEXT_PUBLIC_AUTH === 'magic') {
        await actions?.logout();
      }

      await logout();

      if (isMountedRef.current) {
        push(`/${locale}/`);
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
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
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          alt="My Avatar"
          src={
            user?.image ? user?.image?.uploadURL : '/static/mock-images/avatars/avatar_default.jpg'
          }
        />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        {permission?.adminParent && (
          <MenuItem
            onClick={async () => {
              const { data } = await logoutAdmin();
              const token = data?.logoutAdmin?.token;
              setSession(token);
              window.location.assign(`/${locale}/admin`);
            }}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={backFill}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />
            Back to {permission?.adminParent}
          </MenuItem>
        )}
        {MENU_OPTIONS.map((option) => (
          <NextLink key={option.label} href={option.linkTo}>
            <MenuItem onClick={handleClose} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          </NextLink>
        ))}
        {permission?.admin && (
          <NextLink href={`/admin/${permission.admin}`}>
            <MenuItem sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <Box
                component={Icon}
                icon={settings2Fill}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              {permission?.admin} Settings
            </MenuItem>
          </NextLink>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
