import { ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
}

const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  return (
    <div className="overflow-x-auto section-scroll">
      <div className="flex gap-3 px-4 pb-2">
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
