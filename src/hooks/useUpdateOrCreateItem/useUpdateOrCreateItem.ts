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

  const updateOrCreateItem = async (updateItem: T, itemId = '') => {
    await queryClient.cancelQueries({ queryKey: queryKey } as QueryFilters);
    const oldData = queryClient.getQueryData<T[]>(queryKey as QueryKey);

    if (itemId) {
      queryClient.setQueryData(
        queryKey,
        oldData?.map(item => (item[primaryKey] === itemId ? updateItem : item)),
      );
    } else {
      queryClient.setQueryData(queryKey, [...(oldData ?? []), updateItem]);
    }
  };

  return updateOrCreateItem;
};
