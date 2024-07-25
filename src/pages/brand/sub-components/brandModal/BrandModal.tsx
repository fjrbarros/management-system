import { usePostBrand, usePutBrand } from '@api';
import { Modal } from '@components';
import { GET_BRANDS_QUERY_KEY } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBrandContext } from '../../provider';

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
  const queryclient = useQueryClient();
  const { name = '', brand_id } = updateBrand ?? {};
  const { mutate: postMutate, isPending: isPendingPost } = usePostBrand();
  const { mutate: putMutate, isPending: isPendingPut } = usePutBrand();
  const isPending = isPendingPost || isPendingPut;
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
    const saveMethod = brand_id ? putMutate : postMutate;
    saveMethod(
      { name, brand_id },
      {
        onSuccess: async () => {
          await queryclient.invalidateQueries({
            queryKey: [GET_BRANDS_QUERY_KEY],
          });
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
      title={brand_id ? 'Editar marca' : 'Nova marca'}
      open={openModal}
      onClose={handleClose}
      submitButton={{
        onClick: handleSubmit(onSubmit),
        isLoading: isPending || !!queryclient.isFetching(),
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
