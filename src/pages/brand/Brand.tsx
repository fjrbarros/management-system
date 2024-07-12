import { PageWrapper } from '@components';
import { Button } from '@mui/material';
import { BrandProvider, useBrandContext } from './provider';
import { BrandModal, BrandTable } from './sub-components';

const BrandPage = () => {
  const { openModal, handleOpenModal } = useBrandContext();

  return (
    <PageWrapper pageTitle="Marca">
      <Button sx={{ marginBottom: 3 }} onClick={handleOpenModal}>
        Cadastrar
      </Button>
      <BrandTable />
      {openModal && <BrandModal />}
    </PageWrapper>
  );
};

export const Brand = () => (
  <BrandProvider>
    <BrandPage />
  </BrandProvider>
);
