import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';

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
