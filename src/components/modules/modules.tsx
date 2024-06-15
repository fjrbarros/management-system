import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { IModules } from 'components/drawer/Drawer';
import { path } from 'constants';

export const modules: IModules[] = [
  { icon: <HomeIcon />, title: 'Home', uri: path.home },
  { icon: <PeopleIcon />, title: 'User', uri: path.user },
  { icon: <InventoryIcon />, title: 'Product', uri: path.product },
];
