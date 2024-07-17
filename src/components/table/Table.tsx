import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextFieldProps } from '@mui/material';
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_RowData,
  MRT_Updater,
  MaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

interface ITableProps<TData extends MRT_RowData> {
  data: TData[];
  isLoading: boolean;
  columns: MRT_ColumnDef<TData, unknown>[];
  pagination: MRT_PaginationState;
  rowCount: number;
  filter: string;
  onPaginationChange: (pagination: MRT_Updater<MRT_PaginationState>) => void;
  onGlobalFilterChange: (filter: string) => void;
  muiSearchTextFieldProps?: TextFieldProps;
  onClickEdit?: (row: MRT_Row<TData>) => void;
  onClickDelete?: (row: MRT_Row<TData>) => void;
  muiPaginationProps?: Record<string, unknown>;
}

export const Table = <TData extends MRT_RowData>({
  data,
  isLoading,
  columns,
  pagination,
  rowCount,
  filter,
  onPaginationChange,
  onGlobalFilterChange,
  muiSearchTextFieldProps,
  onClickEdit,
  onClickDelete,
  muiPaginationProps,
}: ITableProps<TData>) => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ isLoading, pagination, globalFilter: filter }}
    initialState={{ showGlobalFilter: true }}
    localization={MRT_Localization_PT_BR}
    enableRowActions={!!(onClickEdit || onClickDelete)}
    manualFiltering
    manualPagination
    enableColumnFilters={false}
    enableSorting={false}
    enableHiding={false}
    enableColumnActions={false}
    positionActionsColumn="last"
    muiPaginationProps={{
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined',
      ...muiPaginationProps,
    }}
    rowCount={rowCount}
    paginationDisplayMode="pages"
    onPaginationChange={onPaginationChange}
    muiSearchTextFieldProps={{
      autoComplete: 'off',
      ...muiSearchTextFieldProps,
    }}
    positionGlobalFilter="left"
    onGlobalFilterChange={onGlobalFilterChange}
    renderRowActionMenuItems={({ table, closeMenu, row }) => [
      onClickEdit && (
        <MRT_ActionMenuItem
          icon={<EditIcon />}
          key="edit"
          label="Editar"
          onClick={() => {
            onClickEdit(row);
            closeMenu();
          }}
          table={table}
        />
      ),
      onClickDelete && (
        <MRT_ActionMenuItem
          icon={<DeleteIcon />}
          key="delete"
          label="Remover"
          onClick={() => {
            onClickDelete?.(row);
            closeMenu();
          }}
          table={table}
        />
      ),
    ]}
  />
);
