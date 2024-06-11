import { ThemeProvider } from '@providers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routers} />
    </ThemeProvider>
  </React.StrictMode>,
);
