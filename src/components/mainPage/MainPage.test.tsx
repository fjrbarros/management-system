import { drawerWidth } from '@constants';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { customRender } from '@utils';
import { MainPage } from './MainPage';

const renderComponent = (props = {}) => {
  const defaultProps = {
    openDrawer: false,
    children: <div>Test Child</div>,
    ...props,
  };

  return customRender(<MainPage {...defaultProps} />);
};

describe('MainPage', () => {
  it('renders correctly with required props', () => {
    renderComponent();

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('passes openDrawer prop correctly', () => {
    const { container } = renderComponent({ openDrawer: true });
    expect(container.firstChild).toHaveStyle(`margin-left: ${drawerWidth}px`);
  });

  it('renders children correctly', () => {
    renderComponent({ children: <div>Another Child</div> });

    expect(screen.getByText('Another Child')).toBeInTheDocument();
  });
});
