import { render, screen } from '@testing-library/react';
import { PersistentDrawerLeft } from './App';

describe('App', () => {
  it('should render correctly component', () => {
    render(<PersistentDrawerLeft />);

    expect(screen.getByText(/persistent drawer/i)).toBeInTheDocument();
  });
});
