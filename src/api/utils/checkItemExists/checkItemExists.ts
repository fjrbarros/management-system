import { supabase } from '../../supabaseClient';

interface ICheckItemExists {
  table: string;
  property: string;
  value: string;
}

export const checkItemExists = async ({
  table,
  property,
  value,
}: ICheckItemExists) => {
  const { data, error } = await supabase
    .from(table)
    .select(property)
    .ilike(property, value);

  if (error) {
    throw error;
  }

  return data.length > 0;
};
