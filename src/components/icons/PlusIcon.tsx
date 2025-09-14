import React from "react";

interface PlusIconProps {
  className?: string;
  size?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className = "w-3 h-3", size }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export default PlusIcon;
