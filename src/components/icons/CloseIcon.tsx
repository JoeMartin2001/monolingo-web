import React from "react";

interface CloseIconProps {
  className?: string;
  size?: number;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  className = "w-4 h-4",
  size,
}) => {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default CloseIcon;
