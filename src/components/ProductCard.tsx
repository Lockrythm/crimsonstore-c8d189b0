import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  onClick?: () => void;
}

const ProductCard = ({ product, featured = false, onClick }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer flex-shrink-0 ${featured ? "card-gothic-featured w-40" : "card-gothic w-36"}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
          {product.title}
        </h3>
        {product.price > 0 && (
          <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
            ${product.price.toFixed(2)}
          </span>
        )}
        {!featured && (
          <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full ml-1">
            {product.sellerName}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
