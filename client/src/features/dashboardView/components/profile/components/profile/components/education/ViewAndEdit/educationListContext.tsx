import { createContext, useContext } from "react";
import { FormPayload } from "../../../types/formField";

interface Education {
  id: string;
  Education: string;
  Graduation: string;
  Degree: string; 
  Major: string; 
  gpa?: string; 
  [key: string]: any;
}

interface EducationListContextType {
  educations: Education[];
  editingId: string | null;
  loading: boolean;
  error: string | null;
  handleEdit: (id: string) => void;
  handleSave: (id: string, payload: Partial<FormPayload>) => Promise<void>;
  handleCancel: () => void;
}

export const EducationListContext = createContext<EducationListContextType | undefined>(undefined);

export const useEducationListContext = () => {
  return useContext(EducationListContext) || null;
};