import AndroidIcon from '@mui/icons-material/Android';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { IModules } from 'components/drawer/Drawer';
import { pathRoutes } from 'constants';

export const modules: IModules[] = [
  { icon: <HomeIcon />, title: 'Dashboard', uri: pathRoutes.home },
  { icon: <PeopleIcon />, title: 'Usuário', uri: pathRoutes.user },
  { icon: <InventoryIcon />, title: 'Produto', uri: pathRoutes.product },
  { icon: <AndroidIcon />, title: 'Marca', uri: pathRoutes.brand },
];
