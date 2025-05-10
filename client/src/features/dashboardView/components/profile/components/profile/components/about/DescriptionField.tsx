import { ReactElement, cloneElement, useState } from "react";
import { InputField } from "./inputField";
import { CounterComponent } from "./descriptioncharacterCounter";
import { DescriptionFieldProps, DescriptionFieldSubComponents } from "../../types/descriptionTypes";
import React from "react";

export const DescriptionField: React.FC<DescriptionFieldProps> & DescriptionFieldSubComponents = ({
  children,
  className = "",
  maxLength = 500,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || "");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    const limitedValue = newValue.slice(0, maxLength);
    setInternalValue(limitedValue);
    onChange?.(limitedValue);
  };

  return (
    <div className={`w-full${className}`}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === InputField) {
          return cloneElement(child as ReactElement, {
            isTextarea: true,
            resize: true,
            maxLength,
            value,
            onChange: handleChange,
          });
        }

        if (child.type === CounterComponent) {
          return (
            <div className="absolute right-1 xs:right-2 sm:right-4 top-1 xs:top-2 sm:top-4 text-xs xs:text-sm">
              {cloneElement(child as ReactElement, { value, maxLength })}
            </div>
          );
        }

        return child;
      })}
    </div>
  );
};

DescriptionField.Input = InputField;
DescriptionField.Counter = CounterComponent;