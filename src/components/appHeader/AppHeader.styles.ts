import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import MuiToolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';

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
  ({ open, theme }) => ({
    mr: 2,
    ...(open &&
      !theme.isSmallerScreen && { opacity: 0, pointerEvents: 'none' }),
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
  ...(open &&
    !theme.isSmallerScreen && {
      width: `calc(100% - ${theme.drawer.width}px)`,
      marginLeft: `${theme.drawer.width}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));
