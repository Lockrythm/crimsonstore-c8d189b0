import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/mockData";
import { MessageSquare } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  isService?: boolean;
  onClick?: () => void;
}

const ProductCard = ({ product, featured = false, isService = false, onClick }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`cursor-pointer flex-shrink-0 ${featured ? "card-gothic-featured w-44" : "card-gothic w-40"}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isService && (
          <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <MessageSquare size={10} />
            Service
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2 leading-tight">
          {product.title}
        </h3>
        {isService && product.price === 0 ? (
          <span className="inline-block bg-secondary/50 text-secondary-foreground font-medium text-xs px-3 py-1 rounded-full">
            Contact for pricing
          </span>
        ) : product.price > 0 ? (
          <span className="inline-block bg-primary/20 text-primary font-bold text-sm px-3 py-1 rounded-full">
            Rs {product.price.toLocaleString()}
          </span>
        ) : null}
        {!featured && product.sellerName && (
          <p className="text-sm text-muted-foreground mt-2 truncate">
            by {product.sellerName}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
