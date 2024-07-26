import { screen } from '@testing-library/react';
import { customRender } from '@utils';
import Product from './Product';

jest.mock('react-router-dom');
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useModules: jest.fn(() => ({ modules: [] })),
}));

describe('Product', () => {
  it('renders PageWrapper with correct title', () => {
    customRender(<Product />);

    expect(screen.getByText('Produto')).toBeInTheDocument();
  });
});
