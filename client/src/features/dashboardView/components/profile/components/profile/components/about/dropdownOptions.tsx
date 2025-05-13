import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaTimes } from 'react-icons/fa';
import  { DropdownOption, DropdownProps } from '../../types/dropDownTypes';

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  isMulti = false,
  className = "",
  selectedValues = [],
  displaySelections = true,
  showLabels = true,
  clearable = true,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (isMulti) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelect?.(newValues);
    } else {
      onSelect?.(value);
      setIsOpen(false);
    }
  };

  const getDisplayText = () =>
    !displaySelections || !selectedValues.length
      ? placeholder
      : (showLabels
          ? selectedValues.map(v => options.find(o => o.value === v)?.label || v)
          : selectedValues
        ).join(", ");

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        className="flex w-full items-center justify-between rounded-lg border bg-white p-2 xs:p-3 sm:p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate text-xs xs:text-sm sm:text-base">{getDisplayText()}</span>
        <div className="flex items-center gap-1 xs:gap-2">
          {clearable && selectedValues.length > 0 && (
            <FaTimes
              className="text-gray-400 hover:text-gray-600 w-3 xs:w-4 h-3 xs:h-4"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(isMulti ? [] : '');
                setIsOpen(false);
              }}
            />
          )}
          <FaArrowDown className={`text-gray-500 w-3 xs:w-4 h-3 xs:h-4 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full overflow-auto rounded-lg border bg-white mt-1 xs:mt-2 max-h-40 xs:max-h-48 sm:max-h-64 shadow-lg">
          {options.map(({ value, label, icon }) => (
            <li
              key={value}
              className={`flex items-center p-2 xs:p-3 sm:p-4 hover:bg-[--active-menu-hover] hover:text-[--active-menu-hover-text] cursor-pointer min-h-[44px] ${
                selectedValues.includes(value) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSelect(value)}
            >
              {icon && <span className="mr-1 xs:mr-2">{icon}</span>}
              <span className="text-xs xs:text-sm sm:text-base">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};