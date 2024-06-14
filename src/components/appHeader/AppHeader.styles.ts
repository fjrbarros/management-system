import {
  AppBarProps as MuiAppBarProps,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Toolbar as MuiToolbar,
  styled,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IconButtonProps extends MuiIconButtonProps {
  open?: boolean;
}

export const Toolbar = styled(MuiToolbar)({
  justifyContent: 'space-between',
});

export const IconButton = styled(MuiIconButton)<IconButtonProps>(
  ({ open }) => ({
    mr: 2,
    ...(open && { opacity: 0, pointerEvents: 'none' }),
  }),
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  position: 'fixed',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${theme.drawer.width}px)`,
    marginLeft: `${theme.drawer.width}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
