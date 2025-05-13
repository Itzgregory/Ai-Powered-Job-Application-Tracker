import { TechnicalSkillsSelection } from "./technicalSkils";
import { useAddItemFormContext } from "./addItemContext";

export const AddItemFormTechnicalSkills: React.FC = () => {
  const { formState, updateField } = useAddItemFormContext();

  if (formState.roleType !== "technical") return null;

  const handleTechnicalSkillsChange = (values: string[]) => {
    updateField("technicalSkills", values);
  };

  return (
    <TechnicalSkillsSelection
      initialSkills={(formState.technicalSkills as string[]) || []}
      onSkillsChange={handleTechnicalSkillsChange}
      isVisible={true}
    />
  );
};