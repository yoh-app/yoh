import { ReactNode } from 'react';
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  LinkProps,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListItemButtonProps,
} from '@mui/material';
// config
import {
  DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT,
  DASHBOARD_NAVBAR_SUB_ITEM_HEIGHT,
  DASHBOARD_NAVBAR_ICON_ITEM_SIZE,
} from '../../config';
//
import Iconify from '../Iconify';
// type
import { NavItemProps } from './type';

// ----------------------------------------------------------------------

type IProps = LinkProps & ListItemButtonProps;

interface ListItemStyleProps extends IProps {
  component?: ReactNode;
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
}

const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})<ListItemStyleProps>(({ activeRoot, activeSub, subItem, theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  height: DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  // activeRoot
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: DASHBOARD_NAVBAR_SUB_ITEM_HEIGHT,
  }),
}));

interface ListItemTextStyleProps extends ListItemButtonProps {
  isCollapse?: boolean;
}

const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<ListItemTextStyleProps>(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: DASHBOARD_NAVBAR_ICON_ITEM_SIZE,
  height: DASHBOARD_NAVBAR_ICON_ITEM_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
});

// ----------------------------------------------------------------------

const isExternalLink = (path: string) => path.includes('http');

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: NavItemProps) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <NextLink href={path}>
      <ListItemStyle activeRoot={active}>{renderContent}</ListItemStyle>
    </NextLink>
  );
}
// ----------------------------------------------------------------------

type NavItemSubProps = Omit<NavItemProps, 'isCollapse'>;

export function NavItemSub({ item, open = false, active, onOpen }: NavItemSubProps) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener" subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    <NextLink href={path}>
      <ListItemStyle activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

type DotIconProps = {
  active: boolean;
};

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

type ArrowIconProps = {
  open: boolean;
};

export function ArrowIcon({ open }: ArrowIconProps) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
