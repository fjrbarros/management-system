import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '@utils';
import Brand from './Brand';
import { useBrandContext } from './provider';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/module1' })),
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock('./provider', () => ({
  ...jest.requireActual('./provider'),
  useBrandContext: jest.fn(),
}));

const mockContext = {
  openModal: false,
  openDeleteModal: false,
  handleOpenModal: jest.fn(),
};

describe('Brand', () => {
  beforeEach(() => {
    (useBrandContext as jest.Mock).mockReturnValue(mockContext);
  });

  it('renders without crashing', () => {
    customRender(<Brand />);
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  it('calls handleOpenModal when "Cadastrar" button is clicked', () => {
    customRender(<Brand />);
    const button = screen.getByText('Cadastrar');
    fireEvent.click(button);
    expect(mockContext.handleOpenModal).toHaveBeenCalled();
  });

  it('renders BrandModal when openModal is true', () => {
    (useBrandContext as jest.Mock).mockReturnValue({
      ...mockContext,
      openModal: true,
    });
    customRender(<Brand />);
    expect(screen.getByText('Nova marca')).toBeInTheDocument();
  });

  it('renders BrandDeleteModal when openDeleteModal is true', () => {
    (useBrandContext as jest.Mock).mockReturnValue({
      ...mockContext,
      openDeleteModal: true,
    });
    customRender(<Brand />);
    expect(screen.getByText('Remover marca')).toBeInTheDocument();
  });
});
