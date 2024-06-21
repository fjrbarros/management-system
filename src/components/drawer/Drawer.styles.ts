import {
  Drawer as MuiDrawer,
  ListItemButton as MuiListItemButton,
  Theme,
  styled,
} from '@mui/material';

const isLightMode = (theme: Theme) => theme.palette.mode === 'light';

export const DrawerContainer = styled(MuiDrawer)(({ theme }) => ({
  width: theme.drawer.width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.drawer.width,
    boxSizing: 'border-box',
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface ListItemProps {
  isSelected?: boolean;
}

export const ListItemButton = styled(MuiListItemButton)<ListItemProps>(
  ({ theme, isSelected }) => ({
    background:
      isSelected && isLightMode(theme)
        ? '#e6f4ff'
        : isSelected
          ? '#95959517'
          : 'transparent',

    '& .MuiListItemIcon-root, .MuiListItemText-primary': {
      color: isSelected
        ? '#1677ff'
        : isLightMode(theme)
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
    },
    '&:hover': {
      background:
        isSelected && isLightMode(theme)
          ? '#e6f4ff'
          : theme.palette.action.hover,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 2.5,
      height: '100%',
      background: isSelected ? '#1677ff' : 'transparent',
    },
  }),
);
