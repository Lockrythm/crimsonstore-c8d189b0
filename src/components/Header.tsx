import { motion } from "framer-motion";
import BatIcon from "./icons/BatIcon";
import CartIcon from "./CartIcon";
import headerBg from "@/assets/header-bg.jpg";

const Header = () => {
  return (
    <header className="relative h-36 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      />
      
      {/* Fog Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      
      {/* Cart Icon - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <CartIcon />
      </div>
      
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-center h-full gap-3"
      >
        <h1 className="text-4xl font-gothic text-foreground crimson-text-glow tracking-wide">
          Crimson
        </h1>
        <BatIcon size={32} className="text-primary animate-float" />
      </motion.div>
    </header>
  );
};

export default Header;
