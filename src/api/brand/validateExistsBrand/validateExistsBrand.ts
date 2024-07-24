import { checkItemExists } from '../../utils';

export const validateExistsBrand = async (value: string) => {
  const brandExists = await checkItemExists({
    table: 'brand',
    property: 'name',
    value,
  });

  if (brandExists) {
    throw new Error(
      'O nome da marca já existe. Por favor, escolha um nome diferente.',
    );
  }
};
