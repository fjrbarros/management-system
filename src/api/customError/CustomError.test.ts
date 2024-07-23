import { CustomError } from './CustomError';

describe('CustomError', () => {
  it('should create a new CustomError instance with default code', () => {
    const error = new CustomError({ message: 'Test error' });

    expect(error.message).toBe('Test error');
    expect(error.code).toBe('custom_error');
  });

  it('should create a new CustomError instance with provided code', () => {
    const error = new CustomError({ message: 'Test error', code: 'test_code' });

    expect(error.message).toBe('Test error');
    expect(error.code).toBe('test_code');
  });
});
