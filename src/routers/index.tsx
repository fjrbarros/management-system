import { path } from 'constants';
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, NotFound, Product, User } from '../pages';

export const routers = createBrowserRouter([
  {
    path: path.home,
    element: <Dashboard />,
  },
  {
    path: path.user,
    element: <User />,
  },
  {
    path: path.product,
    element: <Product />,
  },
  {
    path: path.notFound,
    element: <NotFound />,
  },
]);
