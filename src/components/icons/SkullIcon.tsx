interface SkullIconProps {
  className?: string;
  size?: number;
}

const SkullIcon = ({ className = "", size = 24 }: SkullIconProps) => (
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
    <circle cx="12" cy="10" r="7" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" />
    <path d="M9 17v4" />
    <path d="M12 17v4" />
    <path d="M15 17v4" />
    <path d="M10 13.5c.5.5 1.2.8 2 .8s1.5-.3 2-.8" />
  </svg>
);

export default SkullIcon;
