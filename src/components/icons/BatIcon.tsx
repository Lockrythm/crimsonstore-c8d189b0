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
    {/* Batman-style bat silhouette */}
    <path d="M12 2C11.5 4 10 5.5 8 6.5C6 7.5 4 7 2 6C2.5 8.5 4 10 5 11C3.5 11.5 2 11.5 0.5 11C1.5 13 3.5 14 5.5 14C4.5 15.5 3 16.5 1 17C3 18 5.5 18 7.5 17C8.5 18.5 10 20 12 22C14 20 15.5 18.5 16.5 17C18.5 18 21 18 23 17C21 16.5 19.5 15.5 18.5 14C20.5 14 22.5 13 23.5 11C22 11.5 20.5 11.5 19 11C20 10 21.5 8.5 22 6C20 7 18 7.5 16 6.5C14 5.5 12.5 4 12 2Z" />
  </svg>
);

export default BatIcon;