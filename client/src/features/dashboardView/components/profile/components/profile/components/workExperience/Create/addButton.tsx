import { ReactNode, FC } from "react";

interface BorderlessButtonProps {
  icon?: ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
}

export const BorderlessButton: FC<BorderlessButtonProps> = ({
  icon,
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-base hover:opacity-80 transition-opacity ${className}`}
    >
      {icon && <span className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};