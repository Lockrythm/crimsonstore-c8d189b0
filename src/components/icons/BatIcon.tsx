interface BatIconProps {
  className?: string;
  size?: number;
}

const BatIcon = ({ className = "", size = 24 }: BatIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 10c0-1 .5-2 1.5-2.5C4 6 3 4 3 4s2 .5 4 2c1-1 2.5-2 5-2s4 1 5 2c2-1.5 4-2 4-2s-1 2-2.5 3.5c1 .5 1.5 1.5 1.5 2.5 0 0-1.5-.5-3-1-1 2-3 4-7 4s-6-2-7-4c-1.5.5-3 1-3 1z" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);

export default BatIcon;
