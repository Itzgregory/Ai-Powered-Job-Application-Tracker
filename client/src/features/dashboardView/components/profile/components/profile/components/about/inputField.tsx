import { ReactNode } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean; 
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "Enter text",
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-[--primary-colour] mb-1">{label}</label>}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full p-2 ${icon && iconPosition === 'left' ? 'pl-10' : 'pr-10'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000]-700 disabled:bg-white-200 disabled:cursor-not-allowed`}
          disabled={disabled}
        />
        {icon && iconPosition === "right" && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};
