import { Modal as ModalCP } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValues {
  name: string;
}

const brandSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'deve conter pelo menos 3 caracteres' })
    .max(50, { message: 'deve conter no máximo 50 caracteres' }),
});

export const Modal = ({ open, onClose }: IModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormValues>({ resolver: zodResolver(brandSchema) });

  const onSubmit = (data: IFormValues) => {
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalCP
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Nome"
        fullWidth
        autoFocus
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />
    </ModalCP>
  );
};
