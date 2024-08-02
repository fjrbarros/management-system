import { LoadingCubeGrid } from '@components';
import { pathRoutes } from '@constants';
import React, { Suspense } from 'react';
import { lazyPages } from './lazyPages';

interface IPages {
  path: string;
  component: React.ComponentType;
}

const { login, dashboard, user, product, brand, notFound } = pathRoutes;
const { Login, Dashboard, User, Product, Brand, NotFound } = lazyPages;

const pages: IPages[] = [
  { path: login, component: Login },
  { path: dashboard, component: Dashboard },
  { path: user, component: User },
  { path: product, component: Product },
  { path: brand, component: Brand },
  { path: notFound, component: NotFound },
];

export const routersConfig = pages.map(page => ({
  ...page,
  element: (
    <Suspense fallback={<LoadingCubeGrid />}>
      <page.component />
    </Suspense>
  ),
}));
