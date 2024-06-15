import { useLocalStorage } from '@hooks';
import { PropsWithChildren, useState } from 'react';
import { AppHeader } from '../appHeader/AppHeader';
import { Drawer } from '../drawer/Drawer';
import { MainPage } from '../mainPage/MainPage';

interface PageWrapperProps extends PropsWithChildren {
  pageTitle?: string;
}

export const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  const [storageDrawer, setStorageDrawer] = useLocalStorage('drawer', false);
  const [openDrawer, setOpenDrawer] = useState(storageDrawer);

  const handleToggleDrawer = () => {
    setStorageDrawer(!storageDrawer);
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppHeader
        openDrawer={openDrawer}
        onClick={handleToggleDrawer}
        title={pageTitle}
      />
      <Drawer openDrawer={openDrawer} onClick={handleToggleDrawer} />
      <MainPage openDrawer={openDrawer}>{children}</MainPage>
    </>
  );
};
