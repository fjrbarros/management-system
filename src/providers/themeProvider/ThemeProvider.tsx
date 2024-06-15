import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useMemo, useState } from 'react';
import { ColorModeContext } from './Context';
import { createTheme } from './createTheme';

declare module '@mui/material/styles' {
  interface Theme {
    drawer: {
      width: number;
    };
  }
  interface ThemeOptions {
    drawer?: {
      width?: number;
    };
  }
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
