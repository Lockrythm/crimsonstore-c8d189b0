-- Add product type enum
CREATE TYPE public.product_type AS ENUM ('book', 'item');

-- Add type and is_featured columns to products table
ALTER TABLE public.products 
ADD COLUMN type product_type NOT NULL DEFAULT 'item',
ADD COLUMN is_featured boolean NOT NULL DEFAULT false;

-- Update existing products: set books based on category names
UPDATE public.products p
SET type = 'book'
FROM public.categories c
WHERE p.category_id = c.id 
AND c.name IN ('Vampiric Lore', 'Grimoires', 'Alchemy', 'Medical Texts');

-- Create indexes for better query performance
CREATE INDEX idx_products_type ON public.products(type);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_products_type_status ON public.products(type, status);