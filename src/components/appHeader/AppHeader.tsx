import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useScrollTrigger } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@providers';
import { AppBar, IconButton, Toolbar } from './AppHeader.styles';

interface AppHeaderProps {
  title?: string;
  openDrawer: boolean;
  handleOpenDrawer?: () => void;
}

export const AppHeader = ({
  openDrawer,
  handleOpenDrawer,
  title = '',
}: AppHeaderProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { toggleColorMode } = useThemeContext();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar open={openDrawer} elevation={trigger ? 3 : 0}>
      <Toolbar>
        <IconButton
          open={openDrawer}
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpenDrawer}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <IconButton
          aria-label="brightness"
          sx={{ ml: 1 }}
          onClick={toggleColorMode}
          color="inherit"
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
