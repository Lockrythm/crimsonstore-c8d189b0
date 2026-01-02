import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useBookCategories = () => {
  return useQuery({
    queryKey: ['categories', 'books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('slug', ['vampiric-lore', 'grimoires', 'alchemy', 'medical-texts'])
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useMarketplaceCategories = () => {
  return useQuery({
    queryKey: ['categories', 'marketplace'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('slug', ['electronics', 'accessories', 'stationery'])
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};
