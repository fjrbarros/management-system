import { Drawer as MuiDrawer, styled } from '@mui/material';

export const DrawerContainer = styled(MuiDrawer)(({ theme }) => ({
  width: theme.drawer.width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.drawer.width,
    boxSizing: 'border-box',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& .MuiDrawer-paper': {
      width: '100%',
    },
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
