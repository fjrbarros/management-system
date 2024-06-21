import { useQuery } from '@tanstack/react-query';
import { supabase } from 'api/supabaseClient';

export interface IBrandResponse {
  brand_id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export const useGetBrands = () => {
  const {
    data: resp,
    isLoading,
    isError,
  } = useQuery<IBrandResponse[]>({
    queryKey: ['brands'],
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
