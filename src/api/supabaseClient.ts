import { createClient } from '@supabase/supabase-js';

const isTestMode = import.meta.env.MODE === 'test';
const fakeUrl = 'http://fake-url.com';
const fakeKey = '123';

export const supabase = createClient(
  isTestMode ? fakeUrl : import.meta.env.VITE_SUPABASE_URL,
  isTestMode ? fakeKey : import.meta.env.VITE_SUPABASE_KEY,
);
