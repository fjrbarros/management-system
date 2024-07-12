import { PageWrapper } from '@components';
import { Button } from '@mui/material';
import { BrandProvider, useBrandContext } from './provider';
import { BrandDeleteModal, BrandModal, BrandTable } from './sub-components';

const BrandPage = () => {
  const { openModal, openDeleteModal, handleOpenModal } = useBrandContext();

  return (
    <PageWrapper pageTitle="Marca">
      <Button sx={{ marginBottom: 3 }} onClick={handleOpenModal}>
        Cadastrar
      </Button>
      <BrandTable />
      {openModal && <BrandModal />}
      {openDeleteModal && <BrandDeleteModal />}
    </PageWrapper>
  );
};

export const Brand = () => (
  <BrandProvider>
    <BrandPage />
  </BrandProvider>
);
