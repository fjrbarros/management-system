import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, NotFound } from '../pages';

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
