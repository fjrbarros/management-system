import { GET_BRANDS_QUERY_KEY } from '@constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from 'api/supabaseClient';
import { IBrand, IBrandParams } from './types';

export const useGetBrands = () => {
  const {
    data: resp,
    isLoading,
    isError,
  } = useQuery<IBrand[]>({
    queryKey: [GET_BRANDS_QUERY_KEY],
    queryFn: async () => {
      const { data, error } = await supabase.from('brand').select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const data = resp ?? [];

  return { data, isLoading, isError };
};

export const usePostBrand = () => {
  const {
    mutate,
    data = [],
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({ name = '', brand_id = '' }: IBrandParams) => {
      if (brand_id) {
        const { data, error } = await supabase
          .from('brand')
          .upsert({ name, brand_id })
          .select()
          .returns<IBrand[]>();

        if (error) {
          throw new Error(error.message);
        }

        return data || [];
      }

      const { data, error: error } = await supabase
        .from('brand')
        .upsert({ name })
        .select()
        .returns<IBrand[]>();

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });

  return { mutate, data, isError, error, isPending };
};

export const useDeleteBrand = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (brand_id: string) => {
      const { data, error } = await supabase
        .from('brand')
        .delete()
        .eq('brand_id', brand_id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  return { mutate, isPending };
};
