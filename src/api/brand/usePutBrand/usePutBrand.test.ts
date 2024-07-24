import { act, renderHook } from '@testing-library/react';
import { wrapper } from '@utils';
import { supabase } from '../../supabaseClient';
import { usePutBrand } from './usePutBrand';

jest.mock('../../supabaseClient');

jest.mock('../validateExistsBrand/validateExistsBrand', () => ({
  validateExistsBrand: jest.fn(),
}));

const mockData = { name: 'Brand A', brand_id: '1' };
describe('usePutBrand', () => {
  const mockFrom = jest.fn();
  const mockUpsert = jest.fn();

  beforeEach(() => {
    supabase.from = mockFrom.mockReturnValue({ upsert: mockUpsert });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when request is successful', async () => {
    mockUpsert.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => usePutBrand(), { wrapper });

    await act(async () => {
      result.current.mutate(mockData);
    });

    expect(result.current.isPending).toBe(false);
  });

  it('should return error when request is failed', async () => {
    const mockError = { message: 'error' };
    mockUpsert.mockResolvedValueOnce({ error: mockError });

    const { result } = renderHook(() => usePutBrand(), { wrapper });

    await act(async () => {
      result.current.mutate(mockData);
    });

    expect(result.current.isPending).toBe(false);
  });
});
