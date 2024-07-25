import { pathRoutes } from '@constants';
import { Brand, Dashboard, NotFound, Product, User } from '../pages';

export const routersConfig = [
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
];
