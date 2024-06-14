import { AppHeader } from 'components/appHeader/AppHeader';
import { Drawer } from 'components/drawer/Drawer';
import { MainPage } from 'components/mainPage/MainPage';
import { PropsWithChildren, useState } from 'react';

interface PageWrapperProps extends PropsWithChildren {
  pageTitle?: string;
}

export const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppHeader
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        title={pageTitle}
      />
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <MainPage openDrawer={openDrawer}>{children}</MainPage>
    </>
  );
};
