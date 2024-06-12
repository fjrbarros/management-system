import { DrawerProps } from '@components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from 'providers/themeProvider/Context';
import { AppBar } from './AppHeader.styles';

interface AppHeaderProps extends DrawerProps {}

export const AppHeader = ({ openDrawer, setOpenDrawer }: AppHeaderProps) => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(!openDrawer)}
            edge="start"
            sx={{
              mr: 2,
              ...(openDrawer && { opacity: 0, pointerEvents: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
