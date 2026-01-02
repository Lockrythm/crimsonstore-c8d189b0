import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-full bg-card border border-border hover:border-primary transition-colors"
      >
        <ShoppingCart size={22} className="text-foreground" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
            >
              <span className="text-xs font-bold text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default CartIcon;
