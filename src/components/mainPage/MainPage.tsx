import { DrawerProps } from '@components';
import { PropsWithChildren } from 'react';
import { Main } from './MainPage.styles';

type OmitedProps = Omit<DrawerProps, 'setOpenDrawer'>;

interface MainPageProps extends OmitedProps, PropsWithChildren {}

export const MainPage = ({ children, openDrawer }: MainPageProps) => {
  return <Main open={openDrawer}>{children}</Main>;
};
