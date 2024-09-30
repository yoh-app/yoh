import { useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Avatar, Drawer, Tooltip, Typography, CardActionArea } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { MHidden } from '../../components/@material-extend';
// import sidebarConfig from './SidebarConfig';
import { usePermissionQuery } from 'generated';
import { PATH_ADMIN } from '../../routes/paths';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from 'theme/palette';
import { PRIMARY_COLOR } from 'contexts/SettingsContext';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

type IconCollapseProps = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

function IconCollapse({ onToggleCollapse, collapseClick }: IconCollapseProps) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
  menu,
}: DashboardSidebarProps) {
  const { pathname } = useRouter();
  const { data } = usePermissionQuery();
  const permission = data?.permission;

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  palette.dark.primary = PRIMARY_COLOR[4];
  const themeOptions = {
    palette: { ...palette.dark, mode: 'dark' },
  };

  const theme = createTheme(themeOptions);

  const renderContent = (
    <ThemeProvider theme={theme}>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'black',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            px: 2.5,
            pt: 3,
            pb: 2,
            ...(isCollapse && {
              alignItems: 'center',
            }),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <NextLink href="/">
              <Box sx={{ display: 'inline-flex' }}>
                <Logo />
              </Box>
            </NextLink>

            {/* <MHidden width='lgDown'>
            {!isCollapse && (
              <IconCollapse
                onToggleCollapse={onToggleCollapse}
                collapseClick={collapseClick}
              />
            )}
          </MHidden> */}
          </Stack>

          {isCollapse ? (
            <Avatar
              alt="My Avatar"
              src={
                permission?.imageObj?.url
                  ? permission?.imageObj?.url
                  : '/static/mock-images/avatars/avatar_default.jpg'
              }
              sx={{ mx: 'auto', mb: 2 }}
            />
          ) : (
            <NextLink href={`${PATH_ADMIN.root}/${permission?.admin}`}>
              <AccountStyle>
                <Avatar
                  alt="My Avatar"
                  src={
                    permission?.imageObj?.url
                      ? permission?.imageObj?.url
                      : '/static/mock-images/avatars/avatar_default.jpg'
                  }
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {permission?.name ? permission.name : 'New'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {permission?.admin}
                  </Typography>
                </Box>
              </AccountStyle>
            </NextLink>
          )}
        </Stack>

        <NavSection navConfig={menu ? menu : []} />
      </Scrollbar>
    </ThemeProvider>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
