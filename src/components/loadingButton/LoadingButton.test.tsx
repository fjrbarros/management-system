import { fireEvent, render, screen } from '@testing-library/react';
import { LoadingButton } from './LoadingButton';

describe('LoadingButton', () => {
  it('renders correctly with label', () => {
    render(<LoadingButton label="Submit" />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders correctly with children', () => {
    render(<LoadingButton>Click Me</LoadingButton>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<LoadingButton isLoading={true} label="Submit" />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('disables the button when isLoading is true', () => {
    render(<LoadingButton isLoading={true} label="Submit" />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('disables the button when disabled is true', () => {
    render(<LoadingButton disabled={true} label="Submit" />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('handles click event when not disabled', () => {
    const handleClick = jest.fn();
    render(<LoadingButton onClick={handleClick} label="Submit" />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalled();
  });
});
