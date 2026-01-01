import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";
import { Input } from "@/components/ui/input";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const bookCategories = categories.filter(c => 
    ["vampiric-lore", "grimoires", "alchemy"].includes(c.slug)
  );

  const bookProducts = products.filter(p => 
    p.status === "approved" && 
    (p.categoryId === "1" || p.categoryId === "3" || p.categoryId === "4")
  );

  const filteredBooks = bookProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-gothic text-foreground"
        >
          Books & Grimoires
        </motion.h1>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search tomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:border-primary"
          />
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
                ? "bg-primary text-primary-foreground shadow-crimson-glow" 
                : "bg-card border border-border text-muted-foreground hover:border-primary"
            }`}
          >
            All
          </button>
          {bookCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category.id 
                  ? "bg-primary text-primary-foreground shadow-crimson-glow" 
                  : "bg-card border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Books Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {filteredBooks.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No tomes found in the archives...</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Books;
