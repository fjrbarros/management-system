import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from './Link';

describe('Link', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Link uri="/test">Test Link</Link>
      </BrowserRouter>,
    );

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });
});
