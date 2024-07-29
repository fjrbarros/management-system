import { useGetBrands } from '@api';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@utils';
import { useBrandContext } from '../../provider';
import { BrandTable } from './BrandTable';

jest.mock('@api');
jest.mock('../../provider');

const mockUseGetBrands = useGetBrands as jest.Mock;
const mockUseBrandContext = useBrandContext as jest.Mock;

describe('BrandTable', () => {
  const setUpdateBrand = jest.fn();
  const setDeleteBrand = jest.fn();

  beforeEach(() => {
    mockUseBrandContext.mockReturnValue({ setUpdateBrand, setDeleteBrand });
  });

  it('should render the BrandTable component', () => {
    mockUseGetBrands.mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);
    expect(
      screen.getByPlaceholderText('Pesquisar por nome'),
    ).toBeInTheDocument();
  });

  it('should display loading state', () => {
    mockUseGetBrands.mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: true,
      isError: false,
      error: null,
    });

    const { container } = customRender(<BrandTable />);
    expect(container.querySelector('#mrt-progress')).toBeInTheDocument();
  });

  it('should display error state', () => {
    const error = { code: '500', message: 'Internal Server Error' };
    mockUseGetBrands.mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: false,
      isError: true,
      error,
    });

    customRender(<BrandTable />);
    expect(screen.getByText('Erro ao buscar marcas')).toBeInTheDocument();
  });

  it('should render data in the table', () => {
    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
        { brand_id: 'brand-2', name: 'Brand 2', created_at: '2023-01-02' },
      ],
      totalCount: 2,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);
    expect(screen.getByText('Brand 1')).toBeInTheDocument();
    expect(screen.getByText('Brand 2')).toBeInTheDocument();
  });

  it('should handle pagination', async () => {
    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
        { brand_id: 'brand-2', name: 'Brand 2', created_at: '2023-01-02' },
      ],
      totalCount: 50,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    await waitFor(() => {
      expect(mockUseGetBrands).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 }),
      );
    });
  });

  it('should handle filter', async () => {
    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
        { brand_id: 'brand-2', name: 'Brand 2', created_at: '2023-01-02' },
      ],
      totalCount: 2,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);
    fireEvent.change(screen.getByPlaceholderText('Pesquisar por nome'), {
      target: { value: 'Brand 1' },
    });
    await waitFor(() => {
      expect(mockUseGetBrands).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'Brand 1' }),
      );
    });
  });

  it('should handle edit button click', () => {
    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
      ],
      totalCount: 1,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);

    fireEvent.click(screen.getByRole('button', { name: /ações da linha/i }));
    fireEvent.click(screen.getByText('Editar'));

    expect(setUpdateBrand).toHaveBeenCalledWith({
      brand_id: 'brand-1',
      name: 'Brand 1',
    });
  });

  it('should handle delete button click', () => {
    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
      ],
      totalCount: 1,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);
    fireEvent.click(screen.getByRole('button', { name: /ações da linha/i }));
    fireEvent.click(screen.getByText('Remover'));

    expect(setDeleteBrand).toHaveBeenCalledWith({
      brand_id: 'brand-1',
      name: 'Brand 1',
    });
  });

  it('should copy brand id to clipboard', () => {
    const writeText = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const data = {
      data: [
        { brand_id: 'brand-1', name: 'Brand 1', created_at: '2023-01-01' },
      ],
      totalCount: 1,
    };
    mockUseGetBrands.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
    });

    customRender(<BrandTable />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /clique para copiar/i,
        hidden: true,
      }),
    );

    expect(writeText).toHaveBeenCalledWith('brand-1');
  });
});
