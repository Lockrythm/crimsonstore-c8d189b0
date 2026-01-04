import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductStatus = Database['public']['Enums']['product_status'];
type ProductType = Database['public']['Enums']['product_type'];

export interface ProductWithSeller extends Product {
  profiles: {
    username: string | null;
  } | null;
  categories: {
    name: string;
    slug: string;
  } | null;
}

// ===== BOOK QUERIES =====

// Get all approved books
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
        .eq('type', 'book')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

// Get featured books (or recent if no featured)
export const useFeaturedBooks = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured-books', limit],
    queryFn: async () => {
      // First try featured books
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'book')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (featuredError) throw featuredError;
      
      // If we have featured books, return them
      if (featured && featured.length > 0) {
        return featured as ProductWithSeller[];
      }
      
      // Otherwise, return recent approved books
      const { data: recent, error: recentError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'book')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (recentError) throw recentError;
      return recent as ProductWithSeller[];
    },
  });
};

// ===== MARKETPLACE ITEM QUERIES =====

// Get all approved marketplace items (non-books)
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
        .eq('type', 'item')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

// Get featured marketplace items (or recent if no featured)
export const useFeaturedItems = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured-items', limit],
    queryFn: async () => {
      // First try featured items
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'item')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (featuredError) throw featuredError;
      
      // If we have featured items, return them
      if (featured && featured.length > 0) {
        return featured as ProductWithSeller[];
      }
      
      // Otherwise, return recent approved items
      const { data: recent, error: recentError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'item')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (recentError) throw recentError;
      return recent as ProductWithSeller[];
    },
  });
};

// ===== SERVICE QUERIES =====

// Get all approved services
export const useServiceProducts = () => {
  return useQuery({
    queryKey: ['products', 'services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'service')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

// Get featured services (or recent if no featured)
export const useFeaturedServices = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured-services', limit],
    queryFn: async () => {
      // First try featured services
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'service')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (featuredError) throw featuredError;
      
      // If we have featured services, return them
      if (featured && featured.length > 0) {
        return featured as ProductWithSeller[];
      }
      
      // Otherwise, return recent approved services
      const { data: recent, error: recentError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'service')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (recentError) throw recentError;
      return recent as ProductWithSeller[];
    },
  });
};

// ===== REQUEST QUERIES =====

// Get all approved requests
export const useRequestProducts = () => {
  return useQuery({
    queryKey: ['products', 'requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'request')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductWithSeller[];
    },
  });
};

// Get featured requests (or recent if no featured)
export const useFeaturedRequests = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured-requests', limit],
    queryFn: async () => {
      // First try featured requests
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'request')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (featuredError) throw featuredError;
      
      // If we have featured requests, return them
      if (featured && featured.length > 0) {
        return featured as ProductWithSeller[];
      }
      
      // Otherwise, return recent approved requests
      const { data: recent, error: recentError } = await supabase
        .from('products')
        .select(`
          *,
          profiles(username),
          categories(name, slug)
        `)
        .eq('status', 'approved')
        .eq('type', 'request')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (recentError) throw recentError;
      return recent as ProductWithSeller[];
    },
  });
};

// ===== LEGACY/GENERAL QUERIES =====

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

// Featured products (both types) - for homepage hero
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
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as ProductWithSeller[];
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

// ===== MUTATIONS =====

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

export const useUpdateProductFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, is_featured }: { id: string; is_featured: boolean }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ is_featured })
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
