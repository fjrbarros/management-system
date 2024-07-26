import { screen } from '@testing-library/react';
import { customRender } from '@utils';
import User from './User';

jest.mock('react-router-dom');
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useModules: jest.fn(() => ({ modules: [] })),
}));

describe('User', () => {
  it('renders PageWrapper with correct title', () => {
    customRender(<User />);

    expect(screen.getByText('Usuário')).toBeInTheDocument();
  });
});
