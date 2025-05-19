import { AddItemForm } from "../../workExperience/Create/additemForm";
import { FormConfig, FormPayload } from "../../../types/formField";
import { useEducationListContext } from "./educationListContext";

interface EducationEditFormProps {
  formConfig: FormConfig;
  education: {
    id: string;
    [key: string]: any;
  };
}

export const EducationEditForm: React.FC<EducationEditFormProps> = ({
  formConfig,
  education,
}) => {
  const context = useEducationListContext();
  const { handleSave, handleCancel } = context || {};

  return (
    <AddItemForm
      formConfig={formConfig}
      value={education}
      onSave={(payload: Partial<FormPayload>) => handleSave?.(education.id, payload)}
      onCancel={handleCancel}
      alignButtons="right"
      className="bg-gray-50 p-6 rounded-lg border border-gray-200"
    />
  );
};