import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { QueryClientProvider } from '../../providers/queryClientProvider/QueryClientProvider';
import { ThemeProvider } from '../../providers/themeProvider/ThemeProvider';

export const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </QueryClientProvider>
);

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper, ...options });
