import { motion, AnimatePresence, Variants } from "framer-motion";
import { Book } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BatIcon from "../icons/BatIcon";
import HoodedIcon from "../icons/HoodedIcon";
import BloodDropIcon from "../icons/BloodDropIcon";

const navItems = [
  { path: "/", icon: BatIcon, label: "Home" },
  { path: "/books", icon: Book, label: "Books" },
  { path: "/sell", icon: null, label: "Sell" },
  { path: "/marketplace", icon: BatIcon, label: "Market" },
  { path: "/profile", icon: BatIcon, label: "Profile" },
];

// Animation variants with proper typing
const navbarVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 25,
      staggerChildren: 0.05
    }
  }
};

const navItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

const BottomNav = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10"
      variants={navbarVariants}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
    >
      {/* Gradient border overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="flex items-center justify-evenly h-18 px-4 max-w-lg mx-auto py-2 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isSellButton = item.label === "Sell";

          if (isSellButton) {
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className="relative flex items-center justify-center -mt-6"
              >
                <motion.div
                  initial={{ scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 500, damping: 20 }
                  }}
                  className="relative"
                >
                  {/* Breathing glow effect */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)",
                        "0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.3)",
                        "0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)",
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full"
                  />
                  
                  {/* Main sell button */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center shadow-lg shadow-primary/30">
                    {/* Inner glow */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-500 to-primary opacity-50" />
                    
                    <BloodDropIcon size={32} className="text-primary-foreground relative z-10" />
                  </div>
                </motion.div>
              </Link>
            );
          }

          const IconComponent = item.icon!;

          return (
            <motion.div
              key={item.path}
              variants={navItemVariants}
            >
              <Link to={item.path} className="relative flex-1 flex justify-center">
                <motion.div
                  className="flex flex-col items-center justify-center w-14 h-14 rounded-xl relative"
                  initial={{ scale: 1 }}
                  animate={isActive ? { 
                    scale: 1.12,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  } : { 
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ 
                    scale: 0.92,
                    transition: { type: "spring", stiffness: 500, damping: 20 }
                  }}
                >
                  {/* Active background glow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-primary/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          boxShadow: "0 0 20px rgba(220, 38, 38, 0.2)"
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon with glow effect */}
                  <motion.div
                    className="relative z-10"
                    animate={isActive ? {
                      filter: "drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))"
                    } : {
                      filter: "drop-shadow(0 0 0px rgba(220, 38, 38, 0))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent 
                      size={24} 
                      className={`transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`} 
                    />
                  </motion.div>

                  {/* Label - only visible when active */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-xs font-medium text-primary mt-1 relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Inactive label (dimmed) */}
                  {!isActive && (
                    <span className="text-xs text-muted-foreground/60 mt-1">
                      {item.label}
                    </span>
                  )}

                  {/* Active indicator line */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 h-0.5 bg-primary rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{ width: 20, x: "-50%" }}
                        exit={{ width: 0, x: "-50%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
