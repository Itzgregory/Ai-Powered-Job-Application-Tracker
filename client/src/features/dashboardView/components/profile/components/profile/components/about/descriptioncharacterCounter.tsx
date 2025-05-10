import { CounterProps } from "../../types/descriptionTypes";

export const CounterComponent: React.FC<CounterProps> = ({ value = "", maxLength = 150 }) => {
  const remaining = maxLength - value.length;
  const colorClass =
    remaining === 0
      ? "text-red-500"
      : remaining <= 10
      ? "text-orange-500"
      : "text-black";

  return <span className={`text-xs xs:text-sm sm:text-base ${colorClass}`}>{remaining}</span>;
};

CounterComponent.displayName = "DescriptionField.Counter";