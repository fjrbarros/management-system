import { AppHeader } from 'components/appHeader/AppHeader';
import { Drawer } from 'components/drawer/Drawer';
import { MainPage } from 'components/mainPage/MainPage';
import { PropsWithChildren, useState } from 'react';

export const PageWrapper = ({ children }: PropsWithChildren) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <MainPage openDrawer={openDrawer}>{children}</MainPage>
    </>
  );
};
