import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={`${!hideNav ? "pb-20" : ""}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
