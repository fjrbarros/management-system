import { GET_BRANDS_QUERY_KEY } from '@constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from 'api/supabaseClient';
import { IBrand, IBrandParams } from './types';

const getPagination = (page = 0, size = 10) => {
  const limit = size ? +size : 1;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export const useGetBrands = ({ filter = '' }) => {
  const { from, to } = getPagination();
  const {
    data: resp,
    isLoading,
    isError,
  } = useQuery<IBrand[]>({
    queryKey: [GET_BRANDS_QUERY_KEY, filter],
    queryFn: async () => {
      let query = supabase
        .from('brand')
        .select()
        .order('name', { ascending: true })
        .range(from, to);

      if (filter) {
        query = query.ilike('name', `%${filter}%`);
      }

      const { data, error } = await query;

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
