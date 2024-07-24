import { act, renderHook } from '@testing-library/react';
import { wrapper } from '@utils';
import { supabase } from '../../supabaseClient';
import { usePostBrand } from './usePostBrand';

jest.mock('../../supabaseClient');

jest.mock('../validateExistsBrand/validateExistsBrand', () => ({
  validateExistsBrand: jest.fn(),
}));

const mockData = { name: 'Brand A' };
describe('usePostBrand', () => {
  const mockInsert = jest.fn();
  const mockFrom = jest.fn();

  beforeEach(() => {
    supabase.from = mockFrom.mockReturnValue({ insert: mockInsert });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when request is successful', async () => {
    mockInsert.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => usePostBrand(), { wrapper });

    await act(async () => {
      result.current.mutate(mockData);
    });

    expect(result.current.isPending).toBe(false);
  });

  it('should return error when request is failed', async () => {
    const mockError = { message: 'error' };
    mockInsert.mockResolvedValueOnce({ error: mockError });

    const { result } = renderHook(() => usePostBrand(), { wrapper });

    await act(async () => {
      result.current.mutate(mockData);
    });

    expect(result.current.isPending).toBe(false);
  });
});
