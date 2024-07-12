import { LoadingButton } from '@components';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, PropsWithChildren } from 'react';
import * as Styles from './Modal.styles';

interface IModalProps extends PropsWithChildren {
  open: boolean;
  variant?: 'default' | 'delete';
  onClose: () => void;
  title?: string;
  cancelButton?: {
    label?: string;
    onClick?: () => void;
  };
  submitButton?: {
    label?: string;
    onClick?: () => void;
    isLoading?: boolean;
  };
}

export const Modal = ({
  open,
  variant = 'default',
  onClose,
  title = 'Cadastro',
  cancelButton,
  submitButton,
  children,
}: IModalProps) => {
  const isDeleteVariant = variant === 'delete';
  const {
    label: submitButtonLabel = 'Salvar',
    isLoading: submitButtonIsLoading,
    onClick: submitButtonOnClick,
  } = submitButton ?? {};
  const {
    label: cancelButtonLabel = 'Cancelar',
    onClick: cancelButtonOnClick,
  } = cancelButton ?? {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitButtonOnClick?.();
  };

  const handleClose = () => {
    onClose();
    cancelButtonOnClick?.();
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
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <Styles.IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </Styles.IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color={isDeleteVariant ? 'primary' : 'error'}
        >
          {cancelButtonLabel}
        </Button>
        <LoadingButton
          type="submit"
          isLoading={submitButtonIsLoading}
          color={isDeleteVariant ? 'error' : 'primary'}
        >
          {submitButtonLabel}
        </LoadingButton>
      </DialogActions>
    </Styles.Dialog>
  );
};
