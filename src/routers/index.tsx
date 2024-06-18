import { pathRoutes } from 'constants';
import { createBrowserRouter } from 'react-router-dom';
import { Brand, Dashboard, NotFound, Product, User } from '../pages';

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
    path: pathRoutes.brand,
    element: <Brand />,
  },
  {
    path: pathRoutes.notFound,
    element: <NotFound />,
  },
]);
