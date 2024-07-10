import { PageWrapper } from '@components';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Modal, Table } from './sub-components';

export const Brand = () => {
  const [open, setOpen] = useState(false);

  return (
    <PageWrapper pageTitle="Marca">
      <Button sx={{ marginBottom: 3 }} onClick={() => setOpen(true)}>
        Cadastrar
      </Button>
      <Table />
      <Modal open={open} onClose={() => setOpen(false)} />
    </PageWrapper>
  );
};
