export const pathRoutes = {
  home: '/',
  user: '/user',
  product: '/product',
  brand: '/brand',
  notFound: '*',
};

const systemName = 'management-system';

export const drawerWidth = 240;

export const localStorageKeys = {
  drawer: `${systemName}-drawer`,
  theme: `${systemName}-theme`,
};

export const GET_BRANDS_QUERY_KEY = 'brands';

export const DEFAULT_ROWS_PER_PAGE = [10, 25, 50];
