import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';
import { formatItemName } from '../../utils';
import { IBrandParams } from '../types';
import { validateExistsBrand } from '../validateExistsBrand/validateExistsBrand';

export const usePutBrand = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name, brand_id }: IBrandParams) => {
      const formattedName = formatItemName(name).trim();

      await validateExistsBrand(name);

      const { error } = await supabase
        .from('brand')
        .upsert({ name: formattedName, brand_id });

      if (error) {
        throw error;
      }
    },
  });

  return { mutate, isPending };
};
