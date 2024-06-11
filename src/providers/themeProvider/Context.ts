import { createContext, useContext } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useThemeContext = () => useContext(ColorModeContext);
