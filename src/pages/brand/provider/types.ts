import { IBrand } from '@api';

export type IUpdateBrand = Pick<IBrand, 'brand_id' | 'name'>;

export interface IContext {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  updateBrand: IUpdateBrand | undefined;
  setUpdateBrand: (brand: IUpdateBrand | undefined) => void;
}
