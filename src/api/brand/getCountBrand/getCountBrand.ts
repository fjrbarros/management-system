import { supabase } from '../../supabaseClient';

export const getCountBrand = async (table: string): Promise<number> => {
  const { count } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  return count ?? 0;
};
