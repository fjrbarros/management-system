import { pathRoutes } from '@constants';
import { IModule } from '@types';
import { useMemo } from 'react';
import { To, useLocation } from 'react-router-dom';

export const useModules = () => {
  const { pathname } = useLocation();

  const modules: IModule[] = useMemo(() => {
    const isSelected = (uri: To) => pathname === uri;
    const { dashboard, user, product, brand } = pathRoutes;

    return [
      {
        id: 'dashboard',
        icon: 'Home',
        title: 'Dashboard',
        uri: dashboard,
        isSelected: isSelected(dashboard),
      },
      {
        id: 'user',
        icon: 'People',
        title: 'Usuário',
        uri: user,
        isSelected: isSelected(user),
      },
      {
        id: 'product',
        icon: 'Inventory',
        title: 'Produto',
        uri: product,
        isSelected: isSelected(product),
      },
      {
        id: 'brand',
        icon: 'Label',
        title: 'Marca',
        uri: brand,
        isSelected: isSelected(brand),
      },
    ];
  }, [pathname]);

  return { modules };
};
