import { GET_BRANDS_QUERY_KEY } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { CustomError } from 'api/customError/CustomError';
import { supabase } from 'api/supabaseClient';
import { getPagination } from 'api/utils';
import { IBrandResponse, IGetBrandsParams } from '../types';

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
