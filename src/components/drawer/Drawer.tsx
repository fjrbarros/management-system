import { modules } from '@components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { DrawerContainer, DrawerHeader } from './Drawer.styles';

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
          const border = isSelected
            ? '1px dashed #adadad'
            : '1px solid transparent';

          return (
            <ListItem
              key={title}
              disablePadding
              sx={{ border }}
              onClick={() => handleClickItem(uri)}
            >
              <ListItemButton>
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
