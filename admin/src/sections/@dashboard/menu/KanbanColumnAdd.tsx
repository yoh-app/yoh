import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
// @mui
import { OutlinedInput, Paper, Button, ClickAwayListener } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { createColumn } from '../../../redux/slices/menu';
// components
import Iconify from '../../../components/Iconify';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { board } = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (name) {
        dispatch(createColumn({ newColumn: { name }, board }));
        setName('');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280, color: '#4B5971' }}>
      {!open && (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <OutlinedInput
            fullWidth
            placeholder="New section"
            inputRef={nameRef}
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: 'h6' }}
          />
        </ClickAwayListener>
      )}
    </Paper>
  );
}
