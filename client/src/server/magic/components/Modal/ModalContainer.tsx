import * as React from 'react';
import { useModal } from './index';
import Modal from '@mui/material/Modal';

export default function ModalContainer() {
  const modal = useModal();
  return (
    <Modal
      open={modal.isOpen}
      onClick={modal.config.disableBackgroundDismiss ? undefined : modal.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!modal.config.component ? null : (
        <modal.config.component {...modal.config.props} dismiss={modal.close} />
      )}
    </Modal>
  );
}
