import { QueryClientProvider, ThemeProvider } from '@providers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routersConfig } from './routers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ThemeProvider>
        <RouterProvider router={createBrowserRouter(routersConfig)} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
