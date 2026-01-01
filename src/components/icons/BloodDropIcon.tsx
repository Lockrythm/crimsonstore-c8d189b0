interface BloodDropIconProps {
  className?: string;
  size?: number;
}

const BloodDropIcon = ({ className = "", size = 24 }: BloodDropIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C12 2 6 10 6 14.5C6 18.09 8.69 21 12 21C15.31 21 18 18.09 18 14.5C18 10 12 2 12 2Z" />
  </svg>
);

export default BloodDropIcon;
