import { IBrand, usePostBrand } from '@api';
import { Modal } from '@components';
import { GET_BRANDS_QUERY_KEY } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateOrCreateItem } from '@hooks';
import { TextField } from '@mui/material';
import { useBrandContext } from 'pages/brand/provider';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IFormValues {
  name: string;
}

const brandSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'deve conter pelo menos 3 caracteres' })
    .max(50, { message: 'deve conter no máximo 50 caracteres' }),
});

export const BrandModal = () => {
  const { openModal, handleCloseModal, updateBrand } = useBrandContext();
  const { name = '', brand_id } = updateBrand ?? {};
  const { createItem, updateItem } = useUpdateOrCreateItem<IBrand>({
    queryKey: [GET_BRANDS_QUERY_KEY],
    primaryKey: 'brand_id',
  });
  const { mutate, isPending } = usePostBrand();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
  } = useForm<IFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: { name },
  });

  const handleClose = () => {
    reset();
    handleCloseModal();
  };

  const onSubmit = ({ name }: IFormValues) => {
    mutate(
      { name, brand_id: brand_id },
      {
        onSuccess: async ([resp]) => {
          if (brand_id) {
            await updateItem(resp, brand_id);
          } else {
            await createItem(resp);
          }
          handleClose();
        },
        onError: error => {
          setError('name', { message: error.message });
        },
      },
    );
  };

  return (
    <Modal
      title="Cadastrar marca"
      open={openModal}
      onClose={handleClose}
      submitButton={{
        onClick: handleSubmit(onSubmit),
        isLoading: isPending,
      }}
    >
      <TextField
        label="Nome da marca"
        autoComplete="off"
        fullWidth
        autoFocus
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />
    </Modal>
  );
};
