import { useDeleteBrand } from '@api';
import { Modal } from '@components';
import { GET_BRANDS_QUERY_KEY } from '@constants';
import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useBrandContext } from 'pages/brand/provider';
import { useState } from 'react';

export const BrandDeleteModal = () => {
  const queryclient = useQueryClient();
  const [error, setError] = useState('');
  const { openDeleteModal, handleCloseDeleteModal, deleteBrand } =
    useBrandContext();

  const { name = '', brand_id = '' } = deleteBrand ?? {};
  const { mutate, isPending } = useDeleteBrand();

  const onSubmit = () => {
    mutate(brand_id, {
      onSuccess: async () => {
        await queryclient.invalidateQueries({
          queryKey: [GET_BRANDS_QUERY_KEY],
        });
        handleCloseDeleteModal();
      },
      onError: error => {
        setError(error.message);
      },
    });
  };

  return (
    <Modal
      title="Remover marca"
      variant="delete"
      open={openDeleteModal}
      onClose={handleCloseDeleteModal}
      submitButton={{
        label: 'Remover',
        onClick: onSubmit,
        isLoading: isPending || !!queryclient.isFetching(),
      }}
    >
      <Typography align="center">
        Tem certeza que deseja remover a marca <strong>{name}</strong>?
      </Typography>
      {error && (
        <Typography align="center" color="error">
          {error}
        </Typography>
      )}
    </Modal>
  );
};
