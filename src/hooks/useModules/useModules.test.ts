import { renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useModules } from './useModules';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

jest.mock('@constants', () => ({
  pathRoutes: {
    home: '/home',
    user: '/user',
    product: '/product',
    brand: '/brand',
  },
}));

describe('useModules', () => {
  const mockedUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    mockedUseLocation.mockClear();
  });

  it('returns the correct number of modules', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/home' });
    const { result } = renderHook(() => useModules());
    expect(result.current.modules).toHaveLength(4);
  });

  it('correctly identifies the selected module based on pathname', () => {
    const paths = ['/home', '/user', '/product', '/brand'];

    paths.forEach(path => {
      mockedUseLocation.mockReturnValue({ pathname: path });
      const { result } = renderHook(() => useModules());
      const selectedModule = result.current.modules.find(
        module => module.isSelected,
      );
      expect(selectedModule?.uri).toEqual(path);
    });
  });

  it('each module has expected properties', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/home' });
    const { result } = renderHook(() => useModules());
    result.current.modules.forEach(module => {
      expect(module).toHaveProperty('id');
      expect(module).toHaveProperty('icon');
      expect(module).toHaveProperty('title');
      expect(module).toHaveProperty('uri');
      expect(module).toHaveProperty('isSelected');
    });
  });
});
