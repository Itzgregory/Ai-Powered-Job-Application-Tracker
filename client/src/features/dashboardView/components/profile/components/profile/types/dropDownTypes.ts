import { ReactNode } from "react";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface DropdownProps {
  name?: string;
  options: DropdownOption[];
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  selectedValues?: string[];
  displaySelections?: boolean;
  showLabels?: boolean;
  clearable?: boolean;
  onSelect?: (value: string | string[]) => void;
}