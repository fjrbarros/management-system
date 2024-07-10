import { IBrandResponse, useGetBrands } from '@api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '@utils';
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from 'material-react-table';
import { useMemo } from 'react';

export const Table = () => {
  const { data, isLoading } = useGetBrands();

  const columns = useMemo<MRT_ColumnDef<IBrandResponse>[]>(
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
      data={data}
      state={{
        isLoading,
      }}
      enableRowActions
      positionActionsColumn="last"
      displayColumnDefOptions={{
        'mrt-row-actions': {
          header: 'Ações',
        },
      }}
      renderRowActionMenuItems={({ table, closeMenu }) => [
        <MRT_ActionMenuItem
          icon={<EditIcon />}
          key="edit"
          label="Editar"
          onClick={closeMenu}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<DeleteIcon />}
          key="delete"
          label="Remover"
          onClick={closeMenu}
          table={table}
        />,
      ]}
    />
  );
};
