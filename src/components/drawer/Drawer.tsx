import * as Icons from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItem, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { IModule } from '@types';
import { createElement } from 'react';
import { DrawerContainer, DrawerHeader, ListItemButton } from './Drawer.styles';

interface DrawerProps {
  openDrawer: boolean;
  handleCloseDrawer?: () => void;
  drawerItems?: IModule[];
  onClickDrawerItem?: (module: IModule) => void;
}

export const Drawer = ({
  openDrawer,
  handleCloseDrawer,
  drawerItems = [],
  onClickDrawerItem,
}: DrawerProps) => {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerVariant = isSmallerScreen ? 'temporary' : 'persistent';

  const handleClickItem = (module: IModule) => {
    if (isSmallerScreen) {
      handleCloseDrawer?.();
    }
    onClickDrawerItem?.(module);
  };

  return (
    <DrawerContainer
      variant={drawerVariant}
      open={openDrawer}
      onClose={handleCloseDrawer}
    >
      <DrawerHeader>
        <IconButton onClick={handleCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerItems.map(module => (
          <ListItem
            key={module.id}
            disablePadding
            onClick={() => handleClickItem(module)}
          >
            <ListItemButton isSelected={module.isSelected}>
              <ListItemIcon>{createElement(Icons[module.icon])}</ListItemIcon>
              <ListItemText primary={module.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
};
