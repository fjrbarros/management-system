import { QueryClientProvider } from '@providers';
import { renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { supabase } from '../../supabaseClient';
import { getCountBrand } from '../getCountBrand/getCountBrand';
import { useGetBrands } from './useGetBrands';

jest.mock('../../supabaseClient');
jest.mock('../getCountBrand/getCountBrand');

const wrapper = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

const mockData = [
  { id: 1, name: 'Brand A' },
  { id: 2, name: 'Brand B' },
];

describe('useGetBrands', () => {
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();
  const mockOrder = jest.fn();
  const mockRange = jest.fn();
  const mockIlike = jest.fn();

  beforeEach(() => {
    (getCountBrand as jest.Mock).mockResolvedValue(mockData.length);
    supabase.from = mockFrom.mockReturnValue({
      select: mockSelect.mockReturnValue({
        order: mockOrder.mockReturnValue({
          range: mockRange.mockReturnValue({
            ilike: mockIlike,
          }),
        }),
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return brands data when request is successful', async () => {
    mockRange.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () => useGetBrands({ search: '', page: 1, pageSize: 10 }),
      { wrapper },
    );

    await waitFor(() => {
      const { data, isError } = result.current;

      expect(data).toEqual({ data: mockData, totalCount: mockData.length });
      expect(isError).toBe(false);
    });
  });

  it('should return brands when has search', async () => {
    mockIlike.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () => useGetBrands({ search: 'brand', page: 1, pageSize: 10 }),
      { wrapper },
    );

    await waitFor(() => {
      const { data, isError } = result.current;

      expect(data).toEqual({ data: mockData, totalCount: mockData.length });
      expect(isError).toBe(false);
    });
  });

  it('should handle errors when request fails', async () => {
    const mockError = { message: 'Error fetching data', code: '123' };
    mockRange.mockResolvedValueOnce({ error: mockError });

    const { result } = renderHook(
      () => useGetBrands({ search: '', page: 1, pageSize: 15 }),
      { wrapper },
    );

    await waitFor(() => {
      const { isError, error } = result.current;

      expect(isError).toBe(true);
      expect(error).toEqual(mockError);
    });
  });
});
