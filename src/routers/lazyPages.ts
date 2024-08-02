import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const User = lazy(() => import('../pages/user/User'));
const Product = lazy(() => import('../pages/product/Product'));
const Brand = lazy(() => import('../pages/brand/Brand'));
const NotFound = lazy(() => import('../pages/notFound/NotFound'));
const Login = lazy(() => import('../pages/login/Login'));

export const lazyPages = {
  Login,
  Dashboard,
  User,
  Product,
  Brand,
  NotFound,
};
