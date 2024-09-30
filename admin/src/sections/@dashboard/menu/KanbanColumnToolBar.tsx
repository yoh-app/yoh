import { useRef, useState, useEffect } from 'react';
// @mui
import { Stack, OutlinedInput, MenuItem, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { useTranslation } from 'next-i18next';

// ----------------------------------------------------------------------

type KanbanColumnToolBarProps = {
  columnName: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }: KanbanColumnToolBarProps) {
  const renameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(columnName);
  const { t } = useTranslation('menu');

  useEffect(() => {
    if (open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickRename = () => {
    handleClose();
  };

  const handleChangeColumnName = (event) => {
    setValue(event.target.value);
  };

  const handleUpdateColumn = (event) => {
    if (event.key === 'Enter' && renameRef.current) {
      renameRef.current.blur();
      onUpdate(value);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ pt: 2 }}>
        <OutlinedInput
          size="small"
          placeholder="Section name"
          value={value}
          onChange={handleChangeColumnName}
          onKeyUp={handleUpdateColumn}
          inputRef={renameRef}
          sx={{
            typography: 'h6',
            fontWeight: 'fontWeightBold',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />

        <IconButton size="small" onClick={handleOpen} color={open ? 'inherit' : 'default'}>
          <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ py: 1, px: 0, width: 'auto', mt: 1 }}
      >
        <MenuItem onClick={handleClickRename} sx={{ py: 0.75, px: 1.5 }}>
          <Iconify icon={'eva:text-outline'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          {t('WebsiteAdmin.Menu.rename')}
        </MenuItem>
        <MenuItem onClick={onDelete} sx={{ py: 0.75, px: 1.5 }}>
          <Iconify icon={'la:times'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          {t('WebsiteAdmin.Menu.remove')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
