import { IBrand, useGetBrands } from '@api';
import { Error, Table } from '@components';
import { DEFAULT_ROWS_PER_PAGE } from '@constants';
import { ContentCopy } from '@mui/icons-material';
import { formatDate } from '@utils';
import { MRT_ColumnDef, MRT_PaginationState } from 'material-react-table';
import { useMemo, useState } from 'react';
import { useBrandContext } from '../../provider';

const defaultPagination: MRT_PaginationState = {
  pageIndex: 0,
  pageSize: DEFAULT_ROWS_PER_PAGE[0],
};

export const BrandTable = () => {
  const { setUpdateBrand, setDeleteBrand } = useBrandContext();
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] =
    useState<MRT_PaginationState>(defaultPagination);
  const { data, isLoading, isError, error } = useGetBrands({
    search: filter,
    page: filter ? 0 : pagination.pageIndex,
    pageSize: filter ? 999 : pagination.pageSize,
  });

  const columns = useMemo<MRT_ColumnDef<IBrand>[]>(
    () => [
      {
        accessorKey: 'brand_id',
        header: 'Código',
        size: 150,
        accessorFn: ({ brand_id }) => brand_id.split('-')[0],
        enableClickToCopy: true,
        muiCopyButtonProps: ({ row }) => ({
          startIcon: <ContentCopy />,
          onClick: () => {
            navigator.clipboard.writeText(row.original.brand_id);
          },
        }),
      },
      {
        accessorKey: 'name',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'created_at',
        header: 'Data cadastro',
        size: 200,
        accessorFn: ({ created_at }) => formatDate(created_at),
      },
    ],
    [],
  );

  if (isError) {
    return (
      <Error
        title="Erro ao buscar marcas"
        subtitle="Por favor, tente novamente mais tarde ou entre em contato com o administrador do sistema."
        code={error?.code}
        message={error?.message}
      />
    );
  }

  return (
    <Table
      columns={columns}
      data={data.data}
      isLoading={isLoading}
      filter={filter}
      pagination={pagination}
      rowCount={filter ? data.data.length : data.totalCount}
      onPaginationChange={setPagination}
      onGlobalFilterChange={setFilter}
      muiSearchTextFieldProps={{
        placeholder: 'Pesquisar por nome',
      }}
      muiPaginationProps={{
        rowsPerPageOptions: DEFAULT_ROWS_PER_PAGE,
      }}
      onClickEdit={row => {
        const { brand_id, name } = row.original;
        setUpdateBrand({ brand_id, name });
      }}
      onClickDelete={row => {
        const { brand_id, name } = row.original;
        setDeleteBrand({ brand_id, name });
      }}
    />
  );
};
