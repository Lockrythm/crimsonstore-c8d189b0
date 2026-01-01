import { motion } from "framer-motion";
import BatIcon from "./icons/BatIcon";
import headerBg from "@/assets/header-bg.jpg";

const Header = () => {
  return (
    <header className="relative h-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      />
      
      {/* Fog Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-center h-full gap-2"
      >
        <h1 className="text-4xl font-gothic text-foreground crimson-text-glow">
          Crimson
        </h1>
        <BatIcon size={32} className="text-primary animate-float" />
      </motion.div>
    </header>
  );
};

export default Header;
