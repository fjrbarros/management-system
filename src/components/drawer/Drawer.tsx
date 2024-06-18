import { Link, modules } from '@components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { To, useLocation } from 'react-router-dom';
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

  return (
    <DrawerContainer variant="persistent" anchor="left" open={openDrawer}>
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
            <Link uri={uri} key={title}>
              <ListItem disablePadding sx={{ border }}>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </DrawerContainer>
  );
};
