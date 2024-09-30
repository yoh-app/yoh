import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { List, Collapse } from '@mui/material';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { NavListProps } from './type';

// ----------------------------------------------------------------------

const getActive = (path: string, pathname: string, asPath: string) =>
  pathname.includes(path) || asPath.includes(path);

type NavListRootProps = {
  list: NavListProps;
  isCollapse: boolean;
};

export function NavListRoot({ list, isCollapse }: NavListRootProps) {
  const { pathname, asPath } = useRouter();

  const active = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub key={item.title} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  list: NavListProps;
};

function NavListSub({ list }: NavListSubProps) {
  const { pathname, asPath } = useRouter();

  const activeRoot = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(activeRoot);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={activeRoot} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                active={getActive(item.path, pathname, asPath)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={activeRoot} />;
}
