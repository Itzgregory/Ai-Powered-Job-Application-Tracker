import { InputField } from "../../about/inputField";
import { Dropdown } from "../../about/dropdownOptions";
import { DescriptionField } from "../../about/DescriptionField";
import { CheckboxField } from "./checkboxField";
import { DateField } from "./datePicker";
import { FiBriefcase } from "react-icons/fi";
import { useAddItemFormContext } from "./addItemContext";
import { FormField, FormPayload } from "../../../types/formField";

interface AddItemFormFieldProps {
  field: FormField;
}

export const AddItemFormField: React.FC<AddItemFormFieldProps> = ({ field }) => {
  const { formState, updateField } = useAddItemFormContext();

  switch (field.type) {
    case "input":
      return (
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
            {field.label}
          </label>
          <InputField
            name={field.key}
            placeholder={field.placeholder}
            value={(formState[field.key as keyof FormPayload] as string) || ""}
            onChange={(val) => updateField(field.key as keyof FormPayload, val)}
            icon={<FiBriefcase />}
            iconPosition="left"
            className="w-full gap-2 text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
          />
        </div>
      );

    case "dropdown":
      return (
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
            {field.label}
          </label>
          <Dropdown
            name={field.key}
            options={field.options || []}
            placeholder={field.placeholder}
            isMulti={field.isMulti}
            selectedValues={Array.isArray(formState[field.key as keyof FormPayload])
              ? (formState[field.key as keyof FormPayload] as string[])
              : formState[field.key as keyof FormPayload]
              ? [formState[field.key as keyof FormPayload] as string]
              : []}
            onSelect={(val) => updateField(field.key as keyof FormPayload, val)}
            className="w-full text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
            displaySelections={true}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <CheckboxField
            name={field.key}
            checked={!!formState[field.key as keyof FormPayload]}
            onChange={(val) => updateField(field.key as keyof FormPayload, val)}
            label={field.label}
            className="mt-1 xs:mt-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5 text-[--primary-color] border-[--primary-color]"
          />
        </div>
      );

    case "description":
      return (
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
            {field.label}
          </label>
          <DescriptionField
            name={field.key}
            className="w-full relative"
            maxLength={field.maxLength || 200}
            value={(formState[field.key as keyof FormPayload] as string) || ""}
            onChange={(val) => updateField(field.key as keyof FormPayload, val)}
          >
            <DescriptionField.Input
              placeholder={field.placeholder}
              icon={<FiBriefcase />}
              iconPosition="left"
              className="w-full gap-2 text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
            />
            <DescriptionField.Counter />
          </DescriptionField>
        </div>
      );

    case "date":
      return (
        <div className="mb-2 xs:mb-3 sm:mb-4">
          <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
            {field.label}
          </label>
          <DateField
            name={field.key}
            placeholder={field.placeholder}
            value={(formState[field.key as keyof FormPayload] as string | null) || null}
            onChange={(val) => updateField(field.key as keyof FormPayload, val)}
            disabled={field.key === "endDate" && formState.isStillEmployed === true}
            className="w-full gap-2 text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
          />
        </div>
      );

    default:
      return null;
  }
};