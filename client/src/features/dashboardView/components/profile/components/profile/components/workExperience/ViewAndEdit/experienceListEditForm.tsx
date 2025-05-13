import { AddItemForm } from "../Create/additemForm";
import { FormConfig, FormPayload } from "../../../types/formField";
import { useExperienceListContext } from "./experienceListContext";

interface ExperienceEditFormProps {
  formConfig: FormConfig;
  experience: {
    id: string;
    [key: string]: any;
  };
}

export const ExperienceEditForm: React.FC<ExperienceEditFormProps> = ({
  formConfig,
  experience,
}) => {
  const { handleSave, handleCancel } = useExperienceListContext();

  return (
    <AddItemForm
      formConfig={formConfig}
      value={experience}
      onSave={(payload: Partial<FormPayload>) => handleSave(experience.id, payload)}
      onCancel={handleCancel}
      alignButtons="right"
      className="bg-gray-50 p-6 rounded-lg border border-gray-200"
    />
  );
};