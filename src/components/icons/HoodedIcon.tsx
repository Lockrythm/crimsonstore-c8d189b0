interface HoodedIconProps {
  className?: string;
  size?: number;
}

const HoodedIcon = ({ className = "", size = 24 }: HoodedIconProps) => (
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
    <path d="M12 2C8 2 5 5 5 9v6c0 2 1 4 3 5l1 2h6l1-2c2-1 3-3 3-5V9c0-4-3-7-7-7z" />
    <circle cx="12" cy="11" r="3" />
    <path d="M9 8c0-1.5 1.5-3 3-3s3 1.5 3 3" />
  </svg>
);

export default HoodedIcon;
