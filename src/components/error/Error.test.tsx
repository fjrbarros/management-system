import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';

describe('Error', () => {
  it('renders correctly with required props', () => {
    render(<Error title="Error Title" />);

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.queryByText('code:')).not.toBeInTheDocument();
    expect(screen.queryByText('message:')).not.toBeInTheDocument();
  });

  it('renders correctly with subtitle', () => {
    render(<Error title="Error Title" subtitle="Error Subtitle" />);

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error Subtitle')).toBeInTheDocument();
  });

  it('renders correctly with code', () => {
    render(<Error title="Error Title" code="404" />);

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('code: 404')).toBeInTheDocument();
  });

  it('renders correctly with message', () => {
    render(<Error title="Error Title" message="Error Message" />);

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('message: Error Message')).toBeInTheDocument();
  });

  it('renders correctly with all props', () => {
    render(
      <Error
        title="Error Title"
        subtitle="Error Subtitle"
        code="404"
        message="Error Message"
      />,
    );

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error Subtitle')).toBeInTheDocument();
    expect(screen.getByText('code: 404')).toBeInTheDocument();
    expect(screen.getByText('message: Error Message')).toBeInTheDocument();
  });
});
