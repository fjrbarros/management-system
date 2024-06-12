import { Dispatch, SetStateAction } from 'react';

export interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}
