import { FC } from "react";
import clsx from "clsx";

interface CheckboxFieldProps {
  name?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  className?: string; 
}

export const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  checked,
  onChange,
  label,
  className,
}) => (
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={clsx(
        "h-4 w-4 text-[--button-color] border-[--button-color] rounded",
        className
      )}
    />
    {label && <span className="text-sm">{label}</span>}
  </label>
);
