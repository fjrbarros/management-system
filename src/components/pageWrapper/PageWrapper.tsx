import { localStorageKeys } from '@constants';
import { useLocalStorage, useModules } from '@hooks';
import { IModule } from '@types';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../appHeader/AppHeader';
import { Drawer } from '../drawer/Drawer';
import { MainPage } from '../mainPage/MainPage';

interface PageWrapperProps extends PropsWithChildren {
  pageTitle?: string;
}

export const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  const { modules } = useModules();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useLocalStorage(
    localStorageKeys.drawer,
    false,
  );

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClickDrawerItem = (module: IModule) => {
    navigate(module.uri);
  };

  return (
    <>
      <AppHeader
        openDrawer={drawerOpen}
        handleOpenDrawer={handleToggleDrawer}
        title={pageTitle}
      />
      <Drawer
        openDrawer={drawerOpen}
        drawerItems={modules}
        handleCloseDrawer={handleToggleDrawer}
        onClickDrawerItem={handleClickDrawerItem}
      />
      <MainPage openDrawer={drawerOpen}>{children}</MainPage>
    </>
  );
};
