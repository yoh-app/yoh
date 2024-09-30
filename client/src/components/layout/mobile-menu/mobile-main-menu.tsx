import { useState } from 'react';

import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site.settings';
import SidebarWrapper from '@components/common/sidebar/sidebar-wrapper';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@contexts/settings.context';

import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { MinusIcon } from '@components/icons/minus-icon';
import { PlusIcon } from '@components/icons/plus-icon';
import { heightCollapse } from '@utils/motion/height-collapse';
import Link from 'next/link';

export default function MobileMainMenu({ page, website }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeSidebar, isAuthorize } = useUI();
  const { menu } = useSettings();
  const [expanded, setExpanded] = useState<number>(0);
  return (
    <SidebarWrapper>
      <ul className="flex-grow">
        {/* {isAuthorize ? (
          <li key="track-orders">
            <span
              onClick={() => handleClick(ROUTES.ORDERS)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
            >
              {t('nav-menu-track-order')}
            </span>
          </li>
        ) : null} */}

        {menu?.map((item, index) => (
          <MenuItem
            i={index}
            key={item.name}
            name={item.name}
            pages={item.pages}
            expanded={expanded}
            setExpanded={setExpanded}
            closeSidebar={closeSidebar}
            page={page}
            website={website}
          />
        ))}

        {/* {menu.map(({ href, label, icon }) => (
          <li key={`${href}${label}`}>
            <span
              onClick={() => handleClick(href)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
            >
              {icon && <span className="me-2">{icon}</span>}
              {t(label)}
            </span>
          </li>
        ))} */}
      </ul>
    </SidebarWrapper>
  );
}

const MenuItem = ({ i, expanded, setExpanded, name, pages, closeSidebar, page, website }) => {
  const isOpen = i === expanded;
  // active state style
  const activeClass = isOpen ? 'shadow-sm' : '';
  const { query } = useRouter()
  if (pages?.length === 0) {
    return null;
  }

  if (pages?.length === 1) {
    return (
      <h2 className={`${query?.pageSlug === pages?.[0]?.slug && !!query?.pageSlug && !!pages?.[0]?.slug ? 'text-accent' : 'text-heading'} px-5 py-4 text-sm font-semibold md:text-base leading-relaxed hover:text-accent`}>
        <Link href={pages?.[0]?.href}>
          <a onClick={closeSidebar}>
            {name}
          </a>
        </Link>
      </h2>
    );
  }

  return (
    <div className={cn('bg-light rounded mb-2.5 transition-all', activeClass)}>
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="py-4 px-5 rounded cursor-pointer flex items-center justify-between transition-colors"
      >
        <h2 className="text-sm md:text-base font-semibold leading-relaxed text-heading">{name}</h2>
        {isOpen ? (
          <MinusIcon className="flex-shrink-0 stroke-2" width={18} height={18} />
        ) : (
          <PlusIcon className="flex-shrink-0 stroke-2" width={20} height={20} />
        )}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="content" initial="from" animate="to" exit="from" variants={heightCollapse()}>
            <div className="flex flex-col md:pt-1 pb-4 px-5 leading-7 text-sm md:text-base md:leading-loose text-body-dark">
              {pages?.map((_page) => {
                return (
                  <Link href={_page?.href}>
                    <a className={`${query?.pageSlug === _page?.slug ? 'text-accent' : 'text-heading'}`} onClick={closeSidebar}>
                      {_page?.label}
                    </a>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
