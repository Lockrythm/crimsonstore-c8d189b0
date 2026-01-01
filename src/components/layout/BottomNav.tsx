import { motion } from "framer-motion";
import { Book, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const isSellButton = item.label === "Sell";

          if (isSellButton) {
            return (
              <Link key={item.path} to={item.path} className="relative flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="sell-button animate-pulse-glow"
                >
                  <BloodDropIcon size={32} className="text-primary-foreground" />
                  <div className="absolute top-1 right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center">
                    <Plus size={10} className="text-primary" strokeWidth={3} />
                  </div>
                </motion.div>
              </Link>
            );
          }

          const IconComponent = item.icon!;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <IconComponent 
                  size={22} 
                  className={isActive ? "text-primary" : "text-muted-foreground"} 
                />
                <span className={`text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
