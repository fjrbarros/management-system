import { localStorageKeys } from '@constants';
import { useLocalStorage } from '@hooks';
import { PropsWithChildren } from 'react';
import { AppHeader } from '../appHeader/AppHeader';
import { Drawer } from '../drawer/Drawer';
import { MainPage } from '../mainPage/MainPage';

interface PageWrapperProps extends PropsWithChildren {
  pageTitle?: string;
}

export const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  const [drawerOpen, setDrawerOpen] = useLocalStorage(
    localStorageKeys.drawer,
    false,
  );

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppHeader
        openDrawer={drawerOpen}
        handleOpenDrawer={handleToggleDrawer}
        title={pageTitle}
      />
      <Drawer openDrawer={drawerOpen} handleCloseDrawer={handleToggleDrawer} />
      <MainPage openDrawer={drawerOpen}>{children}</MainPage>
    </>
  );
};
