import { ReactNode } from "react";

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  isTextarea?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  resize?: boolean;
  labelIcon?: ReactNode;
  labelIconPosition?: "left" | "right";
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "Enter text",
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  isTextarea = false,
  maxLength,
  value,
  onChange,
  resize = false,
  labelIcon,
  labelIconPosition = "left",
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputClasses = `w-full p-1 xs:p-2 sm:p-3 text-xs xs:text-sm sm:text-base ${
    icon && iconPosition === "left" ? "pl-6 xs:pl-8 sm:pl-10" : icon ? "pr-6 xs:pr-8 sm:pr-10" : ""
  } border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary-color] active:border-[--primary-color] disabled:bg-gray-100 disabled:cursor-not-allowed ${
    isTextarea ? "min-h-[60px] xs:min-h-[80px] sm:min-h-[100px]" : ""
  } ${resize ? "resize-y" : "resize-none"}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-0.5 xs:mb-1">
          <div className={`flex items-center ${labelIconPosition === "left" ? "flex-row" : "flex-row-reverse"} gap-1 xs:gap-1.5 sm:gap-2`}>
            {labelIcon && (
              <span className="text-gray-500 w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5">
                {labelIcon}
              </span>
            )}
            <span className="text-xs xs:text-sm sm:text-base font-medium text-[--primary-color] fallback:text-gray-700">
              {label}
            </span>
          </div>
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <span className="absolute left-1 xs:left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        {isTextarea ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClasses}
            disabled={disabled}
            maxLength={maxLength}
            style={{ resize: resize ? "vertical" : "none" }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClasses}
            disabled={disabled}
            maxLength={maxLength}
          />
        )}
        {icon && iconPosition === "right" && (
          <span className="absolute right-1 xs:right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};