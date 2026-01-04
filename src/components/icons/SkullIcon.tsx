interface SkullIconProps {
  className?: string;
  size?: number;
}

const SkullIcon = ({ className = "", size = 24 }: SkullIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Skull shape - filled style matching the reference */}
    <path d="M12 2C7.58 2 4 5.58 4 10C4 12.5 5 14.5 6.5 16V19C6.5 19.55 6.95 20 7.5 20H8.5V18H10V20H14V18H15.5V20H16.5C17.05 20 17.5 19.55 17.5 19V16C19 14.5 20 12.5 20 10C20 5.58 16.42 2 12 2Z" />
    
    {/* Left eye socket */}
    <circle cx="9" cy="10" r="2" fill="black" />
    
    {/* Right eye socket */}
    <circle cx="15" cy="10" r="2" fill="black" />
    
    {/* Nose hole */}
    <path d="M12 13L10.5 15H13.5L12 13Z" fill="black" />
  </svg>
);

export default SkullIcon;