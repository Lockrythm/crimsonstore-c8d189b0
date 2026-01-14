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
        .in('slug', ['fiction', 'non-fiction', 'mystery', 'romance', 'science-fiction', 'fantasy', 'horror', 'biography', 'self-help', 'educational'])
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

// Service categories (skills and offerings)
export const useServiceCategories = () => {
  return useQuery({
    queryKey: ['categories', 'services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('slug', ['tutoring', 'repairs', 'design', 'other-services'])
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

// Request categories (what people are looking for)
export const useRequestCategories = () => {
  return useQuery({
    queryKey: ['categories', 'requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('slug', ['looking-for-books', 'looking-for-items', 'looking-for-services', 'other-requests'])
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};
