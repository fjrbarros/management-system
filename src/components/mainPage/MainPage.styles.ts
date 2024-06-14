import { styled } from '@mui/material';

export const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: 56,
    height: 'calc(100vh - 56px)',
    ...(open && {
      display: 'none',
    }),
  },
  marginTop: 64,
  flexGrow: 1,
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${theme.drawer.width}px`,
  }),
}));
