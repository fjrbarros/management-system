import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Context } from './Context';
import { IDeleteBrand, IUpdateBrand } from './types';

export const BrandProvider = ({ children }: PropsWithChildren) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateBrand, setUpdateBrand] = useState<IUpdateBrand | undefined>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState<IDeleteBrand | undefined>();

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdateBrand(undefined);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteBrand(undefined);
  };

  useEffect(() => {
    if (updateBrand) {
      handleOpenModal();
    }
  }, [updateBrand]);

  useEffect(() => {
    if (deleteBrand) {
      setOpenDeleteModal(true);
    }
  }, [deleteBrand]);

  const value = useMemo(
    () => ({
      openModal,
      handleOpenModal,
      handleCloseModal,
      updateBrand,
      setUpdateBrand,
      openDeleteModal,
      deleteBrand,
      setDeleteBrand,
      handleCloseDeleteModal,
    }),
    [deleteBrand, openDeleteModal, openModal, updateBrand],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
