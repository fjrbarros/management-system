import { fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@utils';
import { BrandModal } from './BrandModal';

const mockHandleCloseModal = jest.fn();
const mockUpdateBrand = {
  name: 'Existing Brand',
  brand_id: '123',
};
const mockUseBrandContext = jest.fn().mockImplementation(() => ({
  openModal: true,
  handleCloseModal: mockHandleCloseModal,
  updateBrand: mockUpdateBrand,
}));

jest.mock('../../provider', () => ({
  ...jest.requireActual('../../provider'),
  useBrandContext: () => mockUseBrandContext(),
}));

const mockPostMutate = jest.fn();
const mockPutMutate = jest.fn();
const mockUsePostBrand = jest.fn().mockImplementation(() => ({
  mutate: mockPostMutate,
  isPending: false,
}));
const mockUsePutBrand = jest.fn().mockImplementation(() => ({
  mutate: mockPutMutate,
  isPending: false,
}));

jest.mock('@api', () => ({
  usePostBrand: () => mockUsePostBrand(),
  usePutBrand: () => mockUsePutBrand(),
}));

describe('BrandModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with the correct title for editing', () => {
    customRender(<BrandModal />);

    expect(screen.getByText(/editar marca/i)).toBeInTheDocument();
  });

  it('should render the modal with the correct title for creating', () => {
    mockUseBrandContext.mockImplementationOnce(() => ({
      openModal: true,
      handleCloseModal: mockHandleCloseModal,
      updateBrand: undefined,
    }));

    customRender(<BrandModal />);

    expect(screen.getByText(/nova marca/i)).toBeInTheDocument();
  });

  it('should call the putMutate function with the correct data on submit for editing', async () => {
    mockPutMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
    });

    customRender(<BrandModal />);

    const input = screen.getByLabelText(/nome da marca/i);
    const newName = 'Updated Brand';

    fireEvent.change(input, { target: { value: newName } });

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockPutMutate).toHaveBeenCalledWith(
        { name: newName, brand_id: '123' },
        expect.any(Object),
      ),
    );

    await waitFor(() => expect(mockHandleCloseModal).toHaveBeenCalled());
  });

  it('should call the postMutate function with the correct data on submit for creating', async () => {
    mockPostMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
    });

    mockUseBrandContext.mockImplementationOnce(() => ({
      openModal: true,
      handleCloseModal: mockHandleCloseModal,
      updateBrand: undefined,
    }));

    customRender(<BrandModal />);

    const input = screen.getByLabelText(/nome da marca/i);
    const newName = 'New Brand';

    fireEvent.change(input, { target: { value: newName } });

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockPostMutate).toHaveBeenCalledWith(
        { name: newName, brand_id: undefined },
        expect.any(Object),
      ),
    );
    await waitFor(() => expect(mockHandleCloseModal).toHaveBeenCalled());
  });

  it('should display an error message on deletion error', async () => {
    const errorMessage = 'Error message';

    mockPutMutate.mockImplementation((_, { onError }) => {
      onError({ message: errorMessage });
    });

    customRender(<BrandModal />);

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(errorMessage)).toBeInTheDocument(),
    );
  });
});
