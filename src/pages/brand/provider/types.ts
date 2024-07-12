import { IBrand } from '@api';
import { Dispatch, SetStateAction } from 'react';

export type IUpdateBrand = Pick<IBrand, 'brand_id' | 'name'>;
export type IDeleteBrand = Pick<IBrand, 'brand_id' | 'name'>;

export interface IContext {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  updateBrand: IUpdateBrand | undefined;
  setUpdateBrand: Dispatch<SetStateAction<IUpdateBrand | undefined>>;
  openDeleteModal: boolean;
  setDeleteBrand: Dispatch<SetStateAction<IDeleteBrand | undefined>>;
  deleteBrand: IDeleteBrand | undefined;
  handleCloseDeleteModal: () => void;
}
