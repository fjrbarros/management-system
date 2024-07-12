import { createContext, useContext } from 'react';
import { IContext } from './types';

export const Context = createContext<IContext>({} as IContext);

export const useBrandContext = () => useContext(Context);
