import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '@utils';
import { Modal } from './Modal';

const renderComponent = (props = {}) => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    children: <div>Test Child</div>,
    ...props,
  };

  return customRender(<Modal {...defaultProps} />);
};

describe('Modal', () => {
  it('renders correctly with required props', () => {
    renderComponent();

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    renderComponent({ title: 'Test Title' });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles onClose event correctly', () => {
    const onClose = jest.fn();
    renderComponent({ onClose });

    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    renderComponent({ children: <div>Another Child</div> });

    expect(screen.getByText('Another Child')).toBeInTheDocument();
  });

  it('handles submitButton click event correctly', () => {
    const submitButtonOnClick = jest.fn();
    renderComponent({ submitButton: { onClick: submitButtonOnClick } });

    fireEvent.click(screen.getByText('Salvar'));
    expect(submitButtonOnClick).toHaveBeenCalled();
  });

  it('handles cancelButton click event correctly', () => {
    const cancelButtonOnClick = jest.fn();
    renderComponent({ cancelButton: { onClick: cancelButtonOnClick } });

    fireEvent.click(screen.getByText('Cancelar'));
    expect(cancelButtonOnClick).toHaveBeenCalled();
  });

  it('displays the correct labels for buttons', () => {
    renderComponent({
      submitButton: { label: 'Submit' },
      cancelButton: { label: 'Cancel' },
    });

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('displays the loading state for the submit button', () => {
    renderComponent({ submitButton: { isLoading: true } });

    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveAttribute(
      'disabled',
    );
  });

  it('render with delete variant', () => {
    renderComponent({ variant: 'delete' });

    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveClass(
      'MuiButton-outlinedPrimary',
    );
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveClass(
      'MuiButton-containedError',
    );
  });
});
