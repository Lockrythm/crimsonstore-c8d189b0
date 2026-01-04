interface HoodedIconProps {
  className?: string;
  size?: number;
}

const HoodedIcon = ({ className = "", size = 24 }: HoodedIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Hooded figure / cloak shape matching the reference - angular mystical design */}
    <path d="M12 2L4 8V16L8 20H16L20 16V8L12 2Z" />
    
    {/* Inner hood/face area */}
    <path 
      d="M12 5L7 9V14L9 16H15L17 14V9L12 5Z" 
      fill="black" 
      opacity="0.4"
    />
    
    {/* Center diamond/eye detail */}
    <path 
      d="M12 9L10 11L12 13L14 11L12 9Z" 
      fill="currentColor"
    />
  </svg>
);

export default HoodedIcon;