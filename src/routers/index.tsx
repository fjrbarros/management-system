import { pathRoutes } from 'constants';
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, NotFound, Product, User } from '../pages';

export const routers = createBrowserRouter([
  {
    path: pathRoutes.home,
    element: <Dashboard />,
  },
  {
    path: pathRoutes.user,
    element: <User />,
  },
  {
    path: pathRoutes.product,
    element: <Product />,
  },
  {
    path: pathRoutes.notFound,
    element: <NotFound />,
  },
]);
