import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Context } from './Context';
import { IUpdateBrand } from './types';

export const BrandProvider = ({ children }: PropsWithChildren) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateBrand, setUpdateBrand] = useState<IUpdateBrand | undefined>();

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdateBrand(undefined);
  };

  useEffect(() => {
    if (updateBrand) {
      handleOpenModal();
    }
  }, [updateBrand]);

  const value = useMemo(
    () => ({
      openModal,
      handleOpenModal,
      handleCloseModal,
      updateBrand,
      setUpdateBrand,
    }),
    [openModal, updateBrand],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
