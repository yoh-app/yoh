import { useState } from 'react';
import { Icon } from '@iconify/react';
// import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItem,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  BoxProps,
} from '@mui/material';
// theme
import typography from '../theme/typography';
import { useTranslation } from 'next-i18next';
// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

type NavItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};

function NavItem({ item }: { item: NavItemProps }) {
  const theme = useTheme();
  const { pathname } = useRouter();
  const { t } = useTranslation('generated');
  const { title, path, icon, info, intlId, children } = item;
  // const isActiveRoot = path ? !!matchPath({ path, end: false }, pathname) : false;
  const isActiveRoot = path && pathname ? path === pathname : false;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          button
          disableGutters
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={intlId ? t(intlId) : title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path, intlId } = item;
              // const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;
              const isActiveSub = path && pathname ? path === pathname : false;

              return (
                <NextLink href={path}>
                  <ListItemStyle
                    button
                    disableGutters
                    key={title}
                    // @ts-ignore
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main',
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={intlId ? t(intlId) : title} />
                  </ListItemStyle>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path}>
      <ListItemStyle
        button
        disableGutters
        // @ts-ignore
        to={path}
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={item.title} />
        {info && info}
      </ListItemStyle>
    </NextLink>
  );
}

interface NavSectionProps extends BoxProps {
  navConfig: {
    subheader: string;
    items: NavItemProps[];
  }[];
}

export default function NavSection({ navConfig, ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            <ListSubheaderStyle>{subheader}</ListSubheaderStyle>
            {items.map((item: NavItemProps) => (
              <NavItem key={item.title} item={item} />
            ))}
          </List>
        );
      })}
    </Box>
  );
}
