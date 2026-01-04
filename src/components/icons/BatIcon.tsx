interface BatIconProps {
  className?: string;
  size?: number;
}

const BatIcon = ({ className = "", size = 24 }: BatIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Batman-style bat silhouette - filled solid shape */}
    <path d="M12 4C11.5 5.5 10.5 6.5 9 7.5C7 8.5 5 8.5 3 7.5C3.5 9.5 5 11 6 12C4.5 12.5 3 12.5 1.5 12C2.5 14 4.5 15.5 7 16C7.5 17 8.5 18 10 19C10.5 19.5 11.2 20 12 20.5C12.8 20 13.5 19.5 14 19C15.5 18 16.5 17 17 16C19.5 15.5 21.5 14 22.5 12C21 12.5 19.5 12.5 18 12C19 11 20.5 9.5 21 7.5C19 8.5 17 8.5 15 7.5C13.5 6.5 12.5 5.5 12 4Z" />
  </svg>
);

export default BatIcon;