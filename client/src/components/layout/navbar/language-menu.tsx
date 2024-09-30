import { useState } from 'react';
// @mui
import { MenuItem, Stack } from '@mui/material';
// // hooks
// import useLocales from '../../../hooks/useLocales';
// components
import Image from 'admin/src/components/Image';
import MenuPopover from 'admin/src/components/MenuPopover';
import { IconButtonAnimate } from 'admin/src/components/animate';
// next
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const localesMapping = {
  'en': {
    value: 'en',
    label: 'English',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg'
  },
  'zh': {
    value: 'zh',
    label: '中文',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/TW.svg'
  }
}

export default function LanguageMenu() {
  const router = useRouter();
  const { locale = [], locales = [] } = router;

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <Image
          disabledEffect
          // src={currentLang.icon} 
          src={localesMapping[locale].icon}
          alt={locale}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {locales.map((lang) => {
            const languageItem = localesMapping[lang];
            return languageItem ?
              (
                <MenuItem
                  key={languageItem.value}
                  selected={languageItem.value === locale}
                  onClick={() => {
                    localStorage.setItem('language', languageItem.value)
                    router.push(router.asPath, router.asPath, {
                      locale: languageItem.value
                    })
                    handleClose();
                  }}
                >
                  <Image
                    disabledEffect
                    alt={languageItem.label}
                    src={languageItem.icon}
                    sx={{ width: 28, mr: 2 }}
                  />

                  {languageItem.label}
                </MenuItem>

              ) : []
          })
          }
        </Stack>
      </MenuPopover>
    </>
  );
}
