import { fireEvent, render, screen } from '@testing-library/react';
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_RowData,
} from 'material-react-table';
import { Table } from './Table';

const columns: MRT_ColumnDef<MRT_RowData, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
];

const data: MRT_RowData[] = [{ name: 'John Doe' }];

const pagination: MRT_PaginationState = {
  pageIndex: 0,
  pageSize: 1,
};

jest.useFakeTimers();

describe('Table Component', () => {
  it('renders correctly with required props', () => {
    renderComponent();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /john doe/i })).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /linhas por página/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /page 1/i,
      }),
    ).toBeInTheDocument();
  });

  it('handles loading state', () => {
    const { container } = renderComponent({ isLoading: true });

    expect(container.querySelector('#mrt-progress')).toBeInTheDocument();
  });

  it('handles pagination changes', () => {
    const onPaginationChange = jest.fn();

    renderComponent({
      onPaginationChange,
      data: [...data, ...data],
      rowCount: 2,
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /go to next page/i,
      }),
    );
    expect(onPaginationChange).toHaveBeenCalled();
  });

  it('handles global filter changes', () => {
    const onGlobalFilterChange = jest.fn();

    renderComponent({ onGlobalFilterChange });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'foo' },
    });

    jest.advanceTimersByTime(1000);

    expect(onGlobalFilterChange).toHaveBeenCalledWith('foo');
  });

  it('renders action menu items correctly', () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    renderComponent({ onClickEdit, onClickDelete });

    fireEvent.click(screen.getByRole('button', { name: /ações da linha/i }));

    fireEvent.click(screen.getByText('Editar'));
    expect(onClickEdit).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /ações da linha/i }));

    fireEvent.click(screen.getByText('Remover'));
    expect(onClickDelete).toHaveBeenCalled();
  });
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    data,
    columns,
    pagination,
    isLoading: false,
    rowCount: 1,
    filter: '',
    onPaginationChange: jest.fn(),
    onGlobalFilterChange: jest.fn(),
    muiPaginationProps: {
      rowsPerPageOptions: [1, 2],
    },
    ...props,
  };

  return render(<Table {...defaultProps} />);
};
