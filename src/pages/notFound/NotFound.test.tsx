import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

jest.mock('react-router-dom');

describe('NotFound', () => {
  it('renders correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Verifique se a URL está correta ou clique no botão abaixo para voltar',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByAltText('Error 404')).toBeInTheDocument();
  });

  it('should navigate to home page when button is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<NotFound />);

    const button = screen.getByText('Inicio');

    button.click();

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
