import { FC } from "react";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import clsx from "clsx";

interface DateFieldProps {
  label?: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const DateField: FC<DateFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  className,
  name,
}) => {
  const parsedDate = value ? new Date(value) : null;
  const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

  const handleChange = (date: Date | null) => {
    if (date) {
      const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      onChange(formattedDate);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={clsx("flex flex-col", className)}>
      {label && (
        <label className="mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={isValidDate ? parsedDate : null}
          onChange={handleChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          placeholderText={placeholder}
          disabled={disabled}
          name={name}
          className={clsx(
            "w-full rounded border border-gray-300 p-2 xs:p-2.5 sm:p-3 text-xs xs:text-sm sm:text-base",
            "focus:outline-none focus:ring-2 focus:ring-[--primary-color] focus:border-[--primary-color]",
            disabled && "opacity-50 cursor-not-allowed",
            "pl-8 xs:pl-10" 
          )}
        />
        <FiCalendar
          className={clsx(
            "absolute left-2 top-1/2 -translate-y-1/2 w-4 xs:w-5 sm:w-5 h-4 xs:h-5 sm:h-5 ",
            disabled ? "text-gray-400" : "text-gray-600"
          )}
        />
      </div>
    </div>
  );
};