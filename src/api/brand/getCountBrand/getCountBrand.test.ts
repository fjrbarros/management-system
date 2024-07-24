import { supabase } from '../../supabaseClient';
import { getCountBrand } from './getCountBrand';

describe('getCountBrand', () => {
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();

  beforeEach(() => {
    supabase.from = mockFrom.mockReturnValue({ select: mockSelect });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return count data when request is successful', async () => {
    const mockCountData = 2;
    mockSelect.mockResolvedValueOnce({ count: mockCountData });

    const result = await getCountBrand('brand');

    expect(result).toEqual(mockCountData);
  });

  it('should return 0 when count is null', async () => {
    mockSelect.mockResolvedValueOnce({ count: null });

    const result = await getCountBrand('brand');

    expect(result).toEqual(0);
  });
});
