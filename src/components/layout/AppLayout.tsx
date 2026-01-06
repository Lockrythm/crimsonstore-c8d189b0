import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <main className={`${!hideNav ? "pb-20 md:pb-6" : ""}`}>
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
};

export default AppLayout;
