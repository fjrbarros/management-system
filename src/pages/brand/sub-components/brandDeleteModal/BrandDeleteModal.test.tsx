import { fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@utils';
import { BrandDeleteModal } from './BrandDeleteModal';

const mockHandleCloseDeleteModal = jest.fn();
const mockDeleteBrand = {
  name: 'Test Brand',
  brand_id: '1',
};
const useBrandContextData = {
  openDeleteModal: true,
  handleCloseDeleteModal: mockHandleCloseDeleteModal,
  deleteBrand: mockDeleteBrand,
};

const mockUseBrandContext = jest
  .fn()
  .mockImplementation(() => useBrandContextData);

jest.mock('../../provider', () => ({
  ...jest.requireActual('../../provider'),
  useBrandContext: () => mockUseBrandContext(),
}));

const mockMutate = jest.fn();
const mockUseDeleteBrand = jest.fn().mockImplementation(() => ({
  mutate: mockMutate,
  isPending: false,
}));

jest.mock('@api', () => ({
  useDeleteBrand: () => mockUseDeleteBrand(),
}));

describe('BrandDeleteModal', () => {
  it('should render the modal with the brand name', () => {
    customRender(<BrandDeleteModal />);

    expect(screen.getByText(/remover marca/i)).toBeInTheDocument();
    expect(screen.getByText(/test brand/i)).toBeInTheDocument();
  });

  it('should call the mutate function with the correct brand_id on submit', () => {
    customRender(<BrandDeleteModal />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    fireEvent.click(removeButton);

    expect(mockMutate).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('should close the modal on successful deletion', async () => {
    mockMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
    });

    customRender(<BrandDeleteModal />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    fireEvent.click(removeButton);

    await waitFor(() => expect(mockHandleCloseDeleteModal).toHaveBeenCalled());
  });

  it('should display an error message on deletion error', async () => {
    mockUseBrandContext.mockImplementation(() => ({
      ...useBrandContextData,
      deleteBrand: undefined,
    }));
    const errorMessage = 'Deletion failed';
    mockMutate.mockImplementation((_, { onError }) => {
      onError({ message: errorMessage });
    });

    customRender(<BrandDeleteModal />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    fireEvent.click(removeButton);

    await waitFor(() =>
      expect(screen.getByText(errorMessage)).toBeInTheDocument(),
    );
  });
});
