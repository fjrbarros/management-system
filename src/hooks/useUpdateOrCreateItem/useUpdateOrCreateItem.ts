import { QueryFilters, QueryKey, useQueryClient } from '@tanstack/react-query';

interface IUpdateItemProps<T> {
  queryKey: string[];
  primaryKey: keyof T;
}

export const useUpdateOrCreateItem = <T>({
  queryKey,
  primaryKey,
}: IUpdateItemProps<T>) => {
  const queryClient = useQueryClient();

  const cancelQueries = async () => {
    await queryClient.cancelQueries({ queryKey: queryKey } as QueryFilters);
  };

  const getOldData = () => queryClient.getQueryData<T[]>(queryKey as QueryKey);

  const updateData = (data: T[] | undefined) => {
    queryClient.setQueryData(queryKey, data);
  };

  const createItem = async (updateItem: T) => {
    await cancelQueries();
    const oldData = getOldData();

    updateData([...(oldData ?? []), updateItem]);
  };

  const updateItem = async (updateItem: T, itemId = '') => {
    await cancelQueries();
    const oldData = getOldData();

    updateData(
      oldData?.map(item => (item[primaryKey] === itemId ? updateItem : item)),
    );
  };

  const deleteItem = async (itemId: string) => {
    await cancelQueries();
    const oldData = getOldData();

    updateData(oldData?.filter(item => item[primaryKey] !== itemId));
  };

  return { createItem, updateItem, deleteItem };
};
