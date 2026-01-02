-- Add 'service' to the product_type enum
ALTER TYPE public.product_type ADD VALUE IF NOT EXISTS 'service';