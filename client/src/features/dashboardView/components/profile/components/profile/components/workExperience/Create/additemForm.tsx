import { useState, useEffect } from "react";
import { FormConfig, FormPayload } from "../../../types/formField";
import { AddItemFormContext } from "./addItemContext";
import { AddItemFormField } from "./addItemFormField";
import { AddItemFormRoleType } from "./addItemFormRoleTypes";
import { AddItemFormSalesFields } from "./additemFormSalesField";
import { AddItemFormTechnicalSkills } from "./addItemsTechnicalSkills";
import { AddItemFormActions } from "./addItemFormAction";

interface AddItemFormProps {
  formConfig: FormConfig;
  value?: Partial<FormPayload>;
  onChange?: (payload: Partial<FormPayload>) => void;
  alignButtons?: "left" | "right";
  onCancel?: () => void;
  onSave?: (payload: Partial<FormPayload>) => void;
  className?: string;
}

export const AddItemForm: React.FC<AddItemFormProps> & {
  RoleType: typeof AddItemFormRoleType;
  Field: typeof AddItemFormField;
  SalesFields: typeof AddItemFormSalesFields;
  TechnicalSkills: typeof AddItemFormTechnicalSkills;
  Actions: typeof AddItemFormActions;
} = ({
  formConfig,
  value = {},
  onChange,
  alignButtons = "right",
  onCancel,
  onSave,
  className = "",
}) => {
  const [formState, setFormState] = useState<Partial<FormPayload>>(value);

  useEffect(() => {
    setFormState(value);
  }, [value]);

  const updateField = (key: keyof FormPayload, fieldValue: string | string[] | boolean | null) => {
    const updatedState = { ...formState, [key]: fieldValue };
    setFormState(updatedState);
    onChange?.(updatedState);
  };

  const isFormValid = () => {
    const allFields = [
      formConfig.primaryField,
      ...(formConfig.fields || []),
      ...(formConfig.conditionalFields || []),
    ].filter(Boolean);

    return allFields.every((field) => {
      if (
        field?.conditional &&
        formState[field.conditional.key as keyof FormPayload] !== field.conditional.value
      ) {
        return true;
      }

      if (!field?.required) return true;

      const fieldValue = field ? formState[field.key as keyof FormPayload] : undefined;

      if (field.key === "endDate" && formState.isStillEmployed === true) {
        return true;
      }

      if (fieldValue === undefined || fieldValue === "" || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        return false;
      }

      return true;
    });
  };

  return (
    <AddItemFormContext.Provider value={{ formConfig, formState, updateField, isFormValid }}>
      <div className={`w-full grid grid-cols-1 gap-2 xs:gap-3 bg-[--bg-form-color] px-4 py-4 mb-3 sm:gap-4 ${className}`}>
        {formConfig.fields?.map((field) => (
          <AddItemFormField key={field.key} field={field} />
        ))}
        <AddItemFormRoleType />
        <AddItemFormSalesFields />
        <AddItemFormTechnicalSkills />
        <AddItemFormActions alignButtons={alignButtons} onCancel={onCancel} onSave={onSave} />
      </div>
    </AddItemFormContext.Provider>
  );
};

AddItemForm.RoleType = AddItemFormRoleType;
AddItemForm.Field = AddItemFormField;
AddItemForm.SalesFields = AddItemFormSalesFields;
AddItemForm.TechnicalSkills = AddItemFormTechnicalSkills;
AddItemForm.Actions = AddItemFormActions;