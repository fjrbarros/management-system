import { QueryClientProvider } from '@providers';
import { act, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { supabase } from '../../supabaseClient';
import { useDeleteBrand } from './useDeleteBrand';

const wrapper = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

describe('useDeleteBrand', () => {
  const mockFrom = jest.fn();
  const mockDelete = jest.fn();
  const mockEq = jest.fn();

  beforeEach(() => {
    supabase.from = mockFrom.mockReturnValue({
      delete: mockDelete.mockReturnValue({ eq: mockEq }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete brand when request is successful', async () => {
    mockEq.mockResolvedValueOnce({ data: 'success' });

    const { result } = renderHook(() => useDeleteBrand(), { wrapper });

    await act(async () => {
      await result.current.mutate('1');
    });

    expect(result.current.isPending).toBe(false);
  });

  it('should throw error when request is failed', async () => {
    mockEq.mockResolvedValueOnce({ error: 'error' });

    const { result } = renderHook(() => useDeleteBrand(), { wrapper });

    await act(async () => {
      await result.current.mutate('1');
    });

    expect(result.current.isPending).toBe(false);
  });
});
