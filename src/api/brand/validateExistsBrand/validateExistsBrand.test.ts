import { checkItemExists } from '../../utils';
import { validateExistsBrand } from './validateExistsBrand';

jest.mock('../../utils', () => ({
  checkItemExists: jest.fn(),
}));

describe('validateExistsBrand', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not throw an error if the brand does not exist', async () => {
    (checkItemExists as jest.Mock).mockResolvedValue(false);

    await expect(validateExistsBrand('New Brand')).resolves.not.toThrow();
  });

  it('should throw an error if the brand exists', async () => {
    (checkItemExists as jest.Mock).mockResolvedValue(true);

    await expect(validateExistsBrand('Existing Brand')).rejects.toThrow(
      'O nome da marca já existe. Por favor, escolha um nome diferente.',
    );
  });
});
