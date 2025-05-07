import { ReactNode, useState } from "react";
import { FaArrowUp } from 'react-icons/fa';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  isMulti?: boolean; 
  className?: string;
  onSelect?: (value: string | string[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  isMulti = false,
  className = "",
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | string[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (isMulti) {
      const newSelection = selected ? [...(selected as string[]), value] : [value];
      setSelected(newSelection);
      onSelect?.(newSelection);
    } else {
      setSelected(value);
      onSelect?.(value);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <button
        className="w-full flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected ? (Array.isArray(selected) ? selected.join(", ") : selected) : placeholder}</span>
        <FaArrowUp className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}/>
      </button>

      {isOpen && (
        <ul className="absolute w-full bg-white border rounded-lg mt-2 shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
