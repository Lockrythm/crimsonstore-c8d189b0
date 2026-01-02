import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductStatus = Database['public']['Enums']['product_status'];

export interface ProductWithSeller extends Product {
  profiles: {
    username: string | null;
  } | null;
  categories: {
    name: string;
    slug: string;
  } | null;
}

export const useApprovedProducts = () => {
  return useQuery({
    queryKey: ['products', 'approved'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

export const useFeaturedProducts = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

export const useBookProducts = () => {
  return useQuery({
    queryKey: ['products', 'books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .in('categories.slug', ['vampiric-lore', 'grimoires', 'alchemy'])
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // Filter in JS since the join filter might not work as expected
      return (data as ProductWithSeller[]).filter(p => 
        p.categories?.slug && ['vampiric-lore', 'grimoires', 'alchemy'].includes(p.categories.slug)
      );
    },
  });
};

export const useMarketplaceProducts = () => {
  return useQuery({
    queryKey: ['products', 'marketplace'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // Filter for non-book categories
      return (data as ProductWithSeller[]).filter(p => 
        p.categories?.slug && ['electronics', 'accessories', 'stationery'].includes(p.categories.slug)
      );
    },
  });
};

export const useUserProducts = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['products', 'user', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
    enabled: !!userId,
  });
};

export const usePendingProducts = () => {
  return useQuery({
    queryKey: ['products', 'pending'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

export const useAllApprovedProducts = () => {
  return useQuery({
    queryKey: ['products', 'all-approved'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

export const useRejectedProducts = () => {
  return useQuery({
    queryKey: ['products', 'rejected'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'rejected')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Omit<ProductInsert, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProductStatus }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
