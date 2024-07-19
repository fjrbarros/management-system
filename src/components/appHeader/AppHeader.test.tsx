import { useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@providers';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppHeader } from './AppHeader';

jest.mock('@providers', () => ({
  useThemeContext: jest.fn(),
}));
jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useTheme: jest.fn(),
}));
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useScrollTrigger: jest.fn(),
}));

const renderComponent = (props = {}) => {
  const defaultProps = {
    openDrawer: false,
    handleOpenDrawer: jest.fn(),
    title: undefined,
    ...props,
  };

  return render(<AppHeader {...defaultProps} />);
};

describe('AppHeader', () => {
  beforeEach(() => {
    (useThemeContext as jest.Mock).mockReturnValue({
      toggleColorMode: jest.fn(),
    });
    (useTheme as jest.Mock).mockReturnValue({
      palette: {
        mode: 'light',
      },
    });
    (useScrollTrigger as jest.Mock).mockReturnValue(false);
  });

  it('renders correctly with default props', () => {
    (useScrollTrigger as jest.Mock).mockReturnValue(true);
    renderComponent();

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open drawer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /brightness/i }),
    ).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    renderComponent({ title: 'Custom Title' });

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('calls handleOpenDrawer when drawer button is clicked', () => {
    const handleOpenDrawer = jest.fn();
    renderComponent({ handleOpenDrawer });

    fireEvent.click(screen.getByRole('button', { name: /open drawer/i }));
    expect(handleOpenDrawer).toHaveBeenCalled();
  });

  it('calls toggleColorMode when theme toggle button is clicked', () => {
    const toggleColorMode = jest.fn();
    (useThemeContext as jest.Mock).mockReturnValue({ toggleColorMode });

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /brightness/i }));
    expect(toggleColorMode).toHaveBeenCalled();
  });

  it('renders dark mode icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      palette: {
        mode: 'dark',
      },
    });

    renderComponent();

    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });

  it('renders light mode icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      palette: {
        mode: 'light',
      },
    });

    renderComponent();

    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });
});
