import { useLocalStorage } from '@hooks';
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

type TColorMode = 'light' | 'dark';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [storageValue, setStorageValue] = useLocalStorage<TColorMode>(
    'color-mode',
    'light',
  );
  const [mode, setMode] = useState<TColorMode>(storageValue);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          setStorageValue(newMode);
          return newMode;
        });
      },
    }),
    [setStorageValue],
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
