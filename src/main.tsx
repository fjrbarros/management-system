import { QueryClientProvider, ThemeProvider } from '@providers';
import { routers } from '@routers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ThemeProvider>
        <RouterProvider router={routers} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
