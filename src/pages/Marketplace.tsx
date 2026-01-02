import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProductCard from "@/components/ProductCard";
import CartIcon from "@/components/CartIcon";
import { useMarketplaceProducts, useServiceProducts, ProductWithSeller } from "@/hooks/useProducts";
import { useMarketplaceCategories, useServiceCategories } from "@/hooks/useCategories";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = "all" | "products" | "services";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("all");

  const { data: marketplaceCategories = [] } = useMarketplaceCategories();
  const { data: serviceCategories = [] } = useServiceCategories();
  const { data: marketplaceProducts = [], isLoading: loadingProducts } = useMarketplaceProducts();
  const { data: serviceProducts = [], isLoading: loadingServices } = useServiceProducts();

  // Combine based on filter
  const allItems = filterType === "products" 
    ? marketplaceProducts 
    : filterType === "services" 
    ? serviceProducts 
    : [...marketplaceProducts, ...serviceProducts];

  const filteredProducts = allItems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isLoading = loadingProducts || loadingServices;

  // Get visible categories based on filter
  const visibleCategories = filterType === "products" 
    ? marketplaceCategories 
    : filterType === "services" 
    ? serviceCategories 
    : [...marketplaceCategories, ...serviceCategories];

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

  const isService = (product: ProductWithSeller) => product.type === 'service';

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header with Cart */}
        <div className="flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-gothic text-foreground"
          >
            Marketplace
          </motion.h1>
          <CartIcon />
        </div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search the crypt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:border-primary"
          />
        </motion.div>

        {/* Type Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2"
        >
          {[
            { value: "all" as FilterType, label: "All" },
            { value: "products" as FilterType, label: "Products" },
            { value: "services" as FilterType, label: "Services" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setFilterType(filter.value);
                setSelectedCategory(null);
              }}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filterType === filter.value 
                  ? "bg-primary text-primary-foreground shadow-crimson-glow" 
                  : "bg-card border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto section-scroll pb-2"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              !selectedCategory 
                ? "bg-secondary text-secondary-foreground" 
                : "bg-card border border-border text-muted-foreground hover:border-primary"
            }`}
          >
            All Categories
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category.id 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-card border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg bg-card" />
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <ProductCard 
                  product={mapProductForCard(product)} 
                  isService={isService(product)}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>The crypt is empty...</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;
