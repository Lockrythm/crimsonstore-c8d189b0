-- Add 'request' to the product_type enum
ALTER TYPE public.product_type ADD VALUE 'request';

-- Add request categories
INSERT INTO public.categories (name, slug) VALUES
  ('Looking for Books', 'looking-for-books'),
  ('Looking for Items', 'looking-for-items'),
  ('Looking for Services', 'looking-for-services'),
  ('Other Requests', 'other-requests')
ON CONFLICT (slug) DO NOTHING;

-- Drop the old requests table since we're using products table now
DROP TABLE IF EXISTS public.requests;