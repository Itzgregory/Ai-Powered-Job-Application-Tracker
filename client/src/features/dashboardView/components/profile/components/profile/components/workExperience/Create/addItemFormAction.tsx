import { FormPayload } from "../../../types/formField";
import { useAddItemFormContext } from "./addItemContext";

interface AddItemFormActionsProps {
  alignButtons: "left" | "right";
  onCancel?: () => void;
  onSave?: (payload: Partial<FormPayload>) => void;
}

export const AddItemFormActions: React.FC<AddItemFormActionsProps> = ({
  alignButtons,
  onCancel,
  onSave,
}) => {
  const { formState, isFormValid } = useAddItemFormContext();

  return (
    <div
      className={`mt-4 xs:mt-5 sm:mt-6 flex gap-2 xs:gap-3 ${alignButtons === "right" ? "justify-end" : "justify-start"}`}
    >
      <button
        className="rounded bg-gray-200 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base text-gray-800 hover:bg-gray-300"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="rounded bg-[--primary-color] px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base text-white hover:bg-[--active-menu-hover]"
        onClick={() => onSave?.(formState)}
        disabled={!isFormValid()}
      >
        Save
      </button>
    </div>
  );
};