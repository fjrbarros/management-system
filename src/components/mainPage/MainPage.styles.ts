import { styled } from '@mui/material';

export const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: 56,
    minHeight: 'calc(100vh - 56px)',
  },
  marginTop: 64,
  flexGrow: 1,
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.main.background,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !theme.isSmallerScreen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${theme.drawer.width}px`,
    }),
}));
