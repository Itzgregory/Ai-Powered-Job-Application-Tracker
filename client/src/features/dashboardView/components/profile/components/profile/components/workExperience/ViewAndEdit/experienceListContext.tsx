import { createContext, useContext } from "react";
import { FormPayload } from "../../../types/formField";

interface Experience {
  id: string;
  roleType: string;
  employer: string; 
  title: string;
  startDate: string;
  endDate?: string;
  isStillEmployed?: boolean;
  [key: string]: any;
}

interface ExperienceListContextType {
  experiences: Experience[];
  editingId: string | null;
  loading: boolean;
  error: string | null;
  handleEdit: (id: string) => void;
  handleSave: (id: string, payload: Partial<FormPayload>) => Promise<void>;
  handleCancel: () => void;
}

export const ExperienceListContext = createContext<ExperienceListContextType | undefined>(undefined);

export const useExperienceListContext = () => {
  const context = useContext(ExperienceListContext);
  if (!context) {
    throw new Error("useExperienceListContext must be used within ExperienceList");
  }
  return context;
};