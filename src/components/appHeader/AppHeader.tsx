import { DrawerProps } from '@components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@providers';
import { AppBar, IconButton, Toolbar } from './AppHeader.styles';

interface AppHeaderProps extends DrawerProps {
  title?: string;
}

export const AppHeader = ({
  openDrawer,
  setOpenDrawer,
  title = '',
}: AppHeaderProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { toggleColorMode } = useThemeContext();

  return (
    <AppBar open={openDrawer} elevation={2}>
      <Toolbar>
        <IconButton
          open={openDrawer}
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpenDrawer(!openDrawer)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
