import { createTheme as muiCreateTheme } from '@mui/material/styles';

export const createTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return muiCreateTheme({
    palette: {
      mode,
    },
    drawer: {
      width: 240,
    },
    main: {
      background: isDark ? '#2f2f2f' : '#fafafb',
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: ({ theme: { palette } }) => ({
            color: isDark ? palette.text.primary : palette.text.secondary,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#636363',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          containedPrimary: {
            background: '#1677ff',
            color: '#ffffff',
          },
        },
        defaultProps: {
          variant: 'contained',
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
      MuiPaper: {
        styleOverrides: {
          root: {
            background: isDark ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            '::-webkit-scrollbar': {
              width: '10px',
              height: '10px',
              backgroundColor: '#000',
              borderRadius: '5px',
            },
            '::-webkit-scrollbar-track': {
              boxShadow: 'inset 0px 0px 3px rgba(0,0,0,.5)',
              backgroundColor: isDark ? '#c6c6c6' : '#f5f5f5',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? '#929292' : '#bbb',
              borderRadius: '5px',
            },
          },
        },
      },
    },
  });
};
