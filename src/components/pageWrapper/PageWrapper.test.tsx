import { useLocalStorage } from '@hooks';
import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '@utils';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(() => ({ pathname: '/module1' })),
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock('@hooks', () => ({
  useModules: jest.fn(() => ({
    modules: [
      {
        id: 'dashboard',
        icon: 'Home',
        title: 'Dashboard',
        uri: '/home',
        isSelected: false,
      },
    ],
  })),
  useLocalStorage: jest.fn(() => ['light', jest.fn()]),
}));

const renderComponent = (props = {}) => {
  const defaultProps = {
    pageTitle: 'Page title',
    ...props,
  };

  return customRender(
    <PageWrapper {...defaultProps}>
      <h1>children</h1>
    </PageWrapper>,
  );
};

describe('PageWrapper', () => {
  beforeEach(() => {});
  it('renders the children correctly', () => {
    renderComponent();

    expect(screen.getByText('children')).toBeInTheDocument();
  });

  it('renders the page title correctly', () => {
    renderComponent();

    expect(screen.getByText('Page title')).toBeInTheDocument();
  });

  it('toggles the drawer when the header button is clicked', () => {
    const setDrawerOpen = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue(['light', setDrawerOpen]);

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'open drawer' }));

    expect(setDrawerOpen).toHaveBeenCalledWith(false);
  });

  it('navigates to the selected module when the drawer item is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    renderComponent();

    fireEvent.click(screen.getByText('Dashboard'));

    expect(navigate).toHaveBeenCalledWith('/home');
  });
});
