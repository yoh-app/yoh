import { useRef, useState } from 'react';
// @mui
import { MenuItem, ListItemText, Stack } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import Image from '../../../components/Image';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, onChangeLang } = useLocales();
  const { push, asPath } = useRouter();

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          marginX: '5px',
          width: '50px',
          height: '50px',
          ...(open && { bgcolor: 'action.selected' }),
          fontSize: '15px'
        }}
      >
        {currentLang.label}
        {/* <Image disabledEffect src={currentLang.icon} alt={currentLang.label} /> */}
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {allLang.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                push(asPath, undefined, {
                  locale: option?.value,
                });
                // onChangeLang(option.value);
                setOpen(false);
              }}
            >
              {/* <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
