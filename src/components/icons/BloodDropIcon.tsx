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
    {/* Blood drop shape with gradient effect */}
    <defs>
      <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <radialGradient id="bloodHighlight" cx="30%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Main drop shape */}
    <path 
      d="M12 2C12 2 5 10 5 15C5 19.4183 8.13401 22 12 22C15.866 22 19 19.4183 19 15C19 10 12 2 12 2Z"
      fill="url(#bloodGradient)"
    />
    
    {/* Highlight */}
    <path 
      d="M12 2C12 2 5 10 5 15C5 19.4183 8.13401 22 12 22C15.866 22 19 19.4183 19 15C19 10 12 2 12 2Z"
      fill="url(#bloodHighlight)"
    />
    
    {/* Small highlight circle */}
    <ellipse cx="9" cy="13" rx="2" ry="2.5" fill="rgba(255,255,255,0.2)" />
  </svg>
);

export default BloodDropIcon;