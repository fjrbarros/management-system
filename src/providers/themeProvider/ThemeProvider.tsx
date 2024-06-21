import { localStorageKeys } from '@constants';
import { useLocalStorage } from '@hooks';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useMemo, useState } from 'react';
import { ColorModeContext } from './Context';
import { createTheme } from './createTheme';

declare module '@mui/material/styles' {
  interface Theme {
    isSmallerScreen: boolean;
    drawer: {
      width: number;
    };
    main: {
      background: string;
    };
  }
  interface ThemeOptions {
    isSmallerScreen?: boolean;
    drawer?: {
      width?: number;
    };
    main?: {
      background?: string;
    };
  }
}

type TColorMode = 'light' | 'dark';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeMode, setThemeMode] = useLocalStorage<TColorMode>(
    localStorageKeys.theme,
    'light',
  );
  const [mode, setMode] = useState<TColorMode>(themeMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          setThemeMode(newMode);
          return newMode;
        });
      },
    }),
    [setThemeMode],
  );

  let theme = useMemo(() => createTheme(mode), [mode]);
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));
  theme = useMemo(
    () => ({ ...theme, isSmallerScreen }),
    [theme, isSmallerScreen],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
