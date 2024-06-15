import { createTheme as muiCreateTheme } from '@mui/material/styles';

export const createTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return muiCreateTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#1e1e1e' : '#ffffff',
      },
      background: {
        default: isDark ? '#5b5b5b' : '#ededed',
      },
    },
    drawer: {
      width: 240,
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#636363',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '::-webkit-scrollbar': {
              width: '10px',
              backgroundColor: '#000',
              borderRadius: '5px',
            },
            '::-webkit-scrollbar-track': {
              '-webkit-box-shadow': 'inset 0px 0px 3px rgba(0,0,0,.5)',
              backgroundColor: isDark ? '#3e3e3e' : '#f5f5f5',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? '#666666' : '#bbb',
              borderRadius: '5px',
            },
          },
        },
      },
    },
  });
};
