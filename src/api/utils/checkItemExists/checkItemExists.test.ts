import { supabase } from '../../supabaseClient';
import { checkItemExists } from './checkItemExists';

jest.mock('../../supabaseClient');

describe('checkItemExists', () => {
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();
  const mockIlike = jest.fn();

  beforeEach(() => {
    supabase.from = mockFrom.mockReturnValue({
      select: mockSelect.mockReturnValue({
        ilike: mockIlike,
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if item exists', async () => {
    mockIlike.mockResolvedValueOnce({
      data: [{ property: 'value' }],
      error: null,
    });

    const result = await checkItemExists({
      table: 'test_table',
      property: 'test_property',
      value: 'test_value',
    });

    expect(result).toBe(true);
    expect(mockFrom).toHaveBeenCalledWith('test_table');
    expect(mockSelect).toHaveBeenCalledWith('test_property');
    expect(mockIlike).toHaveBeenCalledWith('test_property', 'test_value');
  });

  it('should return false if item does not exist', async () => {
    mockIlike.mockResolvedValueOnce({ data: [], error: null });

    const result = await checkItemExists({
      table: 'test_table',
      property: 'test_property',
      value: 'test_value',
    });

    expect(result).toBe(false);
    expect(mockFrom).toHaveBeenCalledWith('test_table');
    expect(mockSelect).toHaveBeenCalledWith('test_property');
    expect(mockIlike).toHaveBeenCalledWith('test_property', 'test_value');
  });

  it('should throw an error if supabase returns an error', async () => {
    const testError = new Error('Test error');
    mockIlike.mockResolvedValueOnce({ data: null, error: testError });

    await expect(
      checkItemExists({
        table: 'test_table',
        property: 'test_property',
        value: 'test_value',
      }),
    ).rejects.toThrow(testError);

    expect(mockFrom).toHaveBeenCalledWith('test_table');
    expect(mockSelect).toHaveBeenCalledWith('test_property');
    expect(mockIlike).toHaveBeenCalledWith('test_property', 'test_value');
  });
});
