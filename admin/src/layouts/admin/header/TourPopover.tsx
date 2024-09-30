import { useRef, useState } from 'react';
// @mui
import { MenuItem, ListItemText, Stack } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
const tourUser = [
  { key: 'website', name: 'tour.user.createWebsite', link: 'user-create-website' },
  // { key: 'request', name: 'tour.user.request', link: 'user-manage-request' },
  // { key: 'order', name: 'tour.user.order', link: 'user-manage-oder' },
  // { key: 'settings', name: 'tour.user.個人設定' }
]
const tourWebsite = [
  { key: 'website', name: 'tour.website.createWebsite', link: 'website-design-website' },
  { key: 'product', name: 'tour.website.product', link: 'website-manage-product' },
  { key: 'request', name: 'tour.website.request', link: 'website-manage-request' },
  { key: 'order', name: 'tour.website.order', link: 'website-manage-order' }
]

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { t } = useTranslation('admin');
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, onChangeLang } = useLocales();
  const router = useRouter();
  const { push, asPath } = useRouter();

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          width: 44,
          height: 44,
          ...(open && { color: '#6851FF' }),
        }}
      >
        <Iconify icon={'bi:question-circle-fill'} />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current} sx={{ width: '150px' }}>
        <Stack spacing={0.5} sx={{ p: 1, mx: -1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #EBEBEB" }}>
          <Iconify icon={'eva:book-outline'} className="mr-3" />
          {t('tour.title')}
        </Stack>
        <Stack spacing={0.5} sx={{ p: 1, mx: -1, }}>
          {
            router.pathname.search('/admin/User') === 0 ?
              (
                tourUser.map((option) => (
                  <a target='blank' href={`https://document-${router?.locale}.yoh.app/pages/${option.link}-${router?.locale}`}>
                    <MenuItem
                      key={option.key}
                    >
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                        {t(option.name)}
                      </ListItemText>
                    </MenuItem>
                  </a>
                ))
              ) : (
                tourWebsite.map((option) => (
                  <a target='blank' href={`https://document-${router?.locale}.yoh.app/pages/${option.link}-${router?.locale}`}>
                    <MenuItem
                      key={option.key}
                    >
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                        {t(option.name)}
                      </ListItemText>
                    </MenuItem>
                  </a>

                ))
              )
          }
        </Stack>
      </MenuPopover>
    </>
  );
}
