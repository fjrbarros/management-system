import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, PropsWithChildren } from 'react';
import * as Styles from './Modal.styles';

interface IModalProps extends PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  title?: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onSubmit?: () => void;
}

export const Modal = ({
  open,
  handleClose,
  submitButtonLabel = 'Salvar',
  cancelButtonLabel = 'Cancelar',
  onSubmit,
  children,
}: IModalProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <Styles.Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modal title
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error">
          {cancelButtonLabel}
        </Button>
        <Button type="submit">{submitButtonLabel}</Button>
      </DialogActions>
    </Styles.Dialog>
  );
};
