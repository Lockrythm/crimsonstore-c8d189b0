import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkTo?: string;
}

const SectionHeader = ({ title, subtitle, linkTo }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 mb-4">
      <div>
        <h2 className="text-2xl font-gothic text-foreground tracking-wide">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronRight size={24} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
