import { supabase } from '@/integrations/supabase/client';

export const uploadProductImage = async (
  file: File,
  userId: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (uploadError) {
    throw uploadError;
  }
  
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);
  
  return data.publicUrl;
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  // Extract the path from the full URL
  const urlParts = imageUrl.split('/product-images/');
  if (urlParts.length < 2) return;
  
  const filePath = urlParts[1];
  
  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);
  
  if (error) {
    console.error('Error deleting image:', error);
  }
};
