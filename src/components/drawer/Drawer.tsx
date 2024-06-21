import { modules } from '@components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItem, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { DrawerContainer, DrawerHeader, ListItemButton } from './Drawer.styles';

export interface IModules {
  icon: React.ReactNode;
  title: string;
  uri: To;
}

interface DrawerProps {
  openDrawer: boolean;
  handleCloseDrawer?: () => void;
}

export const Drawer = ({ openDrawer, handleCloseDrawer }: DrawerProps) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerVariant = isSmallerScreen ? 'temporary' : 'persistent';
  const navigate = useNavigate();

  const handleClickItem = (uri: To) => {
    if (isSmallerScreen) {
      handleCloseDrawer?.();
    }
    setTimeout(() => {
      navigate(uri);
    }, 200);
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
        {modules.map(({ title, icon, uri }) => {
          const isSelected = pathname === uri;

          return (
            <ListItem
              key={title}
              disablePadding
              onClick={() => handleClickItem(uri)}
            >
              <ListItemButton isSelected={isSelected}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </DrawerContainer>
  );
};
