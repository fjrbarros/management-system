import { useMutation } from '@tanstack/react-query';
import { formatItemName } from 'api/utils';
import { supabase } from '../../supabaseClient';
import { IBrandParams } from '../types';
import { validateExistsBrand } from '../validateExistsBrand/validateExistsBrand';

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
