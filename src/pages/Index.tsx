import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import HorizontalScroll from "@/components/HorizontalScroll";
import ProductCard from "@/components/ProductCard";
import { getFeaturedItems, getFeaturedBooks, getMarketplaceItems } from "@/data/mockData";

const Index = () => {
  const featuredItems = getFeaturedItems();
  const featuredBooks = getFeaturedBooks();
  const marketplaceItems = getMarketplaceItems();

  return (
    <AppLayout>
      <Header />
      
      <div className="space-y-6 py-4">
        {/* Featured Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeader title="Featured Items" linkTo="/marketplace" />
          <HorizontalScroll>
            {featuredItems.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
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
            {featuredBooks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HorizontalScroll>
        </motion.section>

        {/* Bestsellers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeader title="Bestsellers" linkTo="/marketplace" />
        </motion.section>

        {/* Student Marketplace */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader 
            title="Student Marketplace" 
            subtitle="electronics, bags, accessories, stationery"
            linkTo="/marketplace" 
          />
          <HorizontalScroll>
            {marketplaceItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HorizontalScroll>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
