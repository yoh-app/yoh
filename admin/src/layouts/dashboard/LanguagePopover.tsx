import { useRef, useState } from 'react';
// material
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, onChangeLang } = useLocales();
  const { push, asPath } = useRouter();
  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        {/* {currentLang.icon} */}
        <img src={currentLang?.icon} alt={currentLang?.label} />
      </MIconButton>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {allLang.map((option) => (
            <MenuItem
              key={option?.value}
              selected={option?.value === currentLang?.value}
              onClick={() => {
                push(asPath, undefined, {
                  locale: option?.value,
                });
                // onChangeLang(option.value);
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                {/* {option.icon} */}
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option?.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
