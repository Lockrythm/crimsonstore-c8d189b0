import { motion, Variants } from "framer-motion";
import { Book, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BatIcon from "../icons/BatIcon";
import SkullIcon from "../icons/SkullIcon";
import HoodedIcon from "../icons/HoodedIcon";
import BloodDropIcon from "../icons/BloodDropIcon";

const navItems = [
  { path: "/", icon: BatIcon, label: "Home" },
  { path: "/books", icon: Book, label: "Books" },
  { path: "/sell", icon: null, label: "Sell" },
  { path: "/marketplace", icon: SkullIcon, label: "Marketplace" },
  { path: "/profile", icon: HoodedIcon, label: "Profile" },
];

const navbarVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
      staggerChildren: 0.08
    }
  }
};

const navItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
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
      className="fixed bottom-0 left-0 right-0 z-50"
      variants={navbarVariants}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
    >
      {/* Red glow effect under the Sell button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
      
      {/* Main navbar background with rounded top corners */}
      <div className="bg-[#1a1a1a]/98 backdrop-blur-xl rounded-t-3xl border-t border-white/5 mx-2 mb-0">
        <div className="flex items-end justify-between h-20 px-6 pb-3 pt-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isSellButton = item.label === "Sell";

            if (isSellButton) {
              return (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                  className="flex flex-col items-center -mt-8"
                >
                  <Link 
                    to={item.path} 
                    className="relative flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -4,
                        transition: { type: "spring", stiffness: 400, damping: 15 }
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        transition: { type: "spring", stiffness: 500, damping: 20 }
                      }}
                      className="relative"
                    >
                      {/* Breathing glow effect underneath */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-xl"
                        animate={{
                          backgroundColor: [
                            "rgba(220, 38, 38, 0.5)",
                            "rgba(220, 38, 38, 0.8)",
                            "rgba(220, 38, 38, 0.5)",
                          ],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Main blood drop button */}
                      <div className="relative">
                        <BloodDropIcon size={56} className="text-primary drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
                        
                        {/* Plus badge */}
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2a2a2a] rounded-full flex items-center justify-center border-2 border-[#1a1a1a] shadow-lg"
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Plus size={14} className="text-white" strokeWidth={3} />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Label */}
                    <span className="text-xs text-muted-foreground mt-2 font-medium">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            }

            const IconComponent = item.icon!;

            return (
              <motion.div
                key={item.path}
                variants={navItemVariants}
                className="flex-1 flex justify-center"
              >
                <Link to={item.path} className="flex flex-col items-center">
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    whileTap={{ 
                      scale: 0.9,
                      transition: { type: "spring", stiffness: 500, damping: 20 }
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      animate={isActive ? {
                        scale: 1.1,
                        filter: "drop-shadow(0 0 8px rgba(220, 38, 38, 0.7))"
                      } : {
                        scale: 1,
                        filter: "drop-shadow(0 0 0px rgba(220, 38, 38, 0))"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <IconComponent 
                        size={24} 
                        className={`transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`} 
                      />
                    </motion.div>

                    {/* Label - always visible */}
                    <motion.span
                      animate={isActive ? {
                        color: "hsl(var(--primary))",
                        scale: 1.05
                      } : {
                        color: "hsl(var(--muted-foreground))",
                        scale: 1
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-xs mt-1.5 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;