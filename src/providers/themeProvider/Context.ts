import { createContext, useContext } from 'react';

interface IThemeContext {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext({} as IThemeContext);

export const useThemeContext = () => useContext(ColorModeContext);
