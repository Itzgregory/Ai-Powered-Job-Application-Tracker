import { createContext, useContext } from "react";
import { FormConfig, FormPayload } from "../../../types/formField";

interface AddItemFormContextType {
  formConfig: FormConfig;
  formState: Partial<FormPayload>;
  updateField: (key: keyof FormPayload, value: string | string[] | boolean | null) => void;
  isFormValid: () => boolean;
}

export const AddItemFormContext = createContext<AddItemFormContextType | undefined>(undefined);

export const useAddItemFormContext = () => {
  const context = useContext(AddItemFormContext);
  if (!context) {
    throw new Error("useAddItemFormContext must be used within AddItemForm");
  }
  return context;
};