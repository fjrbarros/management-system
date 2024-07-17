import { IBrand, useGetBrands } from '@api';
import { DEFAULT_ROWS_PER_PAGE } from '@constants';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '@utils';
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useBrandContext } from 'pages/brand/provider';
import { useMemo, useState } from 'react';

const defaultPagination: MRT_PaginationState = {
  pageIndex: 0,
  pageSize: DEFAULT_ROWS_PER_PAGE[0],
};

export const BrandTable = () => {
  const { setUpdateBrand, setDeleteBrand } = useBrandContext();
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] =
    useState<MRT_PaginationState>(defaultPagination);
  const { data, isLoading } = useGetBrands({
    filter,
    page: filter ? 0 : pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const columns = useMemo<MRT_ColumnDef<IBrand>[]>(
    () => [
      {
        accessorKey: 'brand_id',
        header: 'Código',
        size: 150,
        accessorFn: ({ brand_id }) => brand_id.split('-')[0],
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

  return (
    <MaterialReactTable
      columns={columns}
      data={data.data}
      state={{ isLoading, pagination, globalFilter: filter }}
      initialState={{ showGlobalFilter: true }}
      localization={MRT_Localization_PT_BR}
      enableRowActions
      manualFiltering
      manualPagination
      enableColumnFilters={false}
      enableSorting={false}
      enableHiding={false}
      enableColumnActions={false}
      positionActionsColumn="last"
      muiPaginationProps={{
        rowsPerPageOptions: DEFAULT_ROWS_PER_PAGE,
        color: 'primary',
        shape: 'rounded',
        variant: 'outlined',
      }}
      rowCount={filter ? data.data.length : data.totalCount}
      paginationDisplayMode="pages"
      onPaginationChange={setPagination}
      muiSearchTextFieldProps={{ placeholder: 'Pesquisar por nome' }}
      positionGlobalFilter="left"
      onGlobalFilterChange={value => setFilter(value)}
      renderRowActionMenuItems={({ table, closeMenu, row }) => [
        <MRT_ActionMenuItem
          icon={<EditIcon />}
          key="edit"
          label="Editar"
          onClick={() => {
            const { brand_id, name } = row.original;
            setUpdateBrand({ brand_id, name });
            closeMenu();
          }}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<DeleteIcon />}
          key="delete"
          label="Remover"
          onClick={() => {
            const { brand_id, name } = row.original;
            setDeleteBrand({ brand_id, name });
            closeMenu();
          }}
          table={table}
        />,
      ]}
    />
  );
};
