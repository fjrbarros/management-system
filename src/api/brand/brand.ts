import { GET_BRANDS_QUERY_KEY } from '@constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomError } from 'api/customError/CustomError';
import { supabase } from 'api/supabaseClient';
import { checkItemExists, formatItemName, getPagination } from 'api/utils';
import { IBrandParams, IBrandResponse, IGetBrandsParams } from './types';

const validateExistsBrand = async (value: string) => {
  const brandExists = await checkItemExists({
    table: 'brand',
    property: 'name',
    value,
  });

  if (brandExists) {
    throw new Error(
      'O nome da marca já existe. Por favor, escolha um nome diferente.',
    );
  }
};

export const useGetBrands = ({
  search = '',
  page,
  pageSize,
}: IGetBrandsParams) => {
  const {
    data: resp,
    isLoading,
    isError,
    error,
  } = useQuery<IBrandResponse, CustomError>({
    queryKey: [GET_BRANDS_QUERY_KEY, search, page, pageSize],
    queryFn: async () => {
      const { count } = await supabase
        .from('brand')
        .select('*', { count: 'exact', head: true });

      const { from, to } = getPagination(page, pageSize);

      let query = supabase
        .from('brand')
        .select()
        .order('name', { ascending: true })
        .range(from, to);

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw new CustomError({
          message: error.message,
          code: error.code,
        });
      }

      return { data, totalCount: count ?? data?.length ?? 0 };
    },
  });

  const data: IBrandResponse = resp ?? { data: [], totalCount: 0 };

  return { data, isLoading, isError, error };
};

export const usePostBrand = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name = '' }: IBrandParams) => {
      const formattedName = formatItemName(name).trim();

      await validateExistsBrand(name);

      const { data, error } = await supabase
        .from('brand')
        .insert({ name: formattedName });

      if (error) {
        throw error;
      }

      return data || [];
    },
  });

  return { mutate, isPending };
};

export const usePutBrand = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name, brand_id }: IBrandParams) => {
      const formattedName = formatItemName(name).trim();

      await validateExistsBrand(name);

      const { data, error } = await supabase
        .from('brand')
        .upsert({ name: formattedName, brand_id });

      if (error) {
        throw error;
      }

      return data || [];
    },
  });

  return { mutate, isPending };
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
