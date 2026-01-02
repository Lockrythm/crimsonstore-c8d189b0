import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import HorizontalScroll from "@/components/HorizontalScroll";
import ProductCard from "@/components/ProductCard";
import { useFeaturedProducts, useBookProducts, useMarketplaceProducts, ProductWithSeller } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => (
  <div className="w-44 flex-shrink-0">
    <Skeleton className="aspect-square rounded-lg bg-card" />
    <Skeleton className="h-5 w-3/4 mt-3 bg-card" />
    <Skeleton className="h-5 w-1/2 mt-2 bg-card" />
  </div>
);

const Index = () => {
  const { data: featuredItems = [], isLoading: loadingFeatured } = useFeaturedProducts();
  const { data: featuredBooks = [], isLoading: loadingBooks } = useBookProducts();
  const { data: marketplaceItems = [], isLoading: loadingMarketplace } = useMarketplaceProducts();

  const mapProductForCard = (product: ProductWithSeller) => ({
    id: product.id,
    sellerId: product.seller_id,
    sellerName: product.profiles?.username || 'Unknown',
    categoryId: product.category_id || '',
    title: product.title,
    description: product.description || '',
    price: Number(product.price),
    imageUrl: product.image_url || '',
    status: product.status as 'pending' | 'approved' | 'rejected',
    createdAt: product.created_at,
  });

  return (
    <AppLayout>
      <Header />
      
      <div className="space-y-8 py-4">
        {/* Featured Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeader title="Featured Items" linkTo="/marketplace" />
          <HorizontalScroll>
            {loadingFeatured ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : featuredItems.length > 0 ? (
              featuredItems.map((product) => (
                <ProductCard key={product.id} product={mapProductForCard(product)} featured />
              ))
            ) : (
              <p className="text-muted-foreground text-base px-4">No items yet...</p>
            )}
          </HorizontalScroll>
        </motion.section>

        {/* Featured Books */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader title="Featured Books" linkTo="/books" />
          <HorizontalScroll>
            {loadingBooks ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : featuredBooks.length > 0 ? (
              featuredBooks.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={mapProductForCard(product)} />
              ))
            ) : (
              <p className="text-muted-foreground text-base px-4">No books yet...</p>
            )}
          </HorizontalScroll>
        </motion.section>

        {/* Student Marketplace */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeader 
            title="Student Marketplace" 
            subtitle="electronics, bags, accessories, stationery"
            linkTo="/marketplace" 
          />
          <HorizontalScroll>
            {loadingMarketplace ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : marketplaceItems.length > 0 ? (
              marketplaceItems.map((product) => (
                <ProductCard key={product.id} product={mapProductForCard(product)} />
              ))
            ) : (
              <p className="text-muted-foreground text-base px-4">No items yet...</p>
            )}
          </HorizontalScroll>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
