import { useState, useMemo, useEffect } from "react";
import { Dropdown } from "../../about/dropdownOptions";
import { technicalSkillsOptions } from "../../../utils/formExperience";
import { SelectedRolesPills } from "../../about/dropdownselectedrolespill";

interface TechnicalSkillsSelectionProps {
  onSkillsChange?: (skills: string[]) => void;
  initialSkills?: string[];
  isVisible?: boolean;
}

export const TechnicalSkillsSelection = ({
  onSkillsChange,
  initialSkills = [],
  isVisible = false,
}: TechnicalSkillsSelectionProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills);

  const selectedSkillLabels = useMemo(() => {
    return selectedSkills.map(value => {
      const option = technicalSkillsOptions.find(opt => opt.value === value);
      return option?.label || value;
    });
  }, [selectedSkills]);

  const handleSelect = (value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value];
    setSelectedSkills(values);
    onSkillsChange?.(values);
  };

  const handleRemoveSkill = (valueToRemove: string) => {
    const skillValue = technicalSkillsOptions.find(opt => opt.label === valueToRemove)?.value || valueToRemove;
    const updatedValues = selectedSkills.filter(v => v !== skillValue);
    setSelectedSkills(updatedValues);
    onSkillsChange?.(updatedValues);
  };

  // Reset skills if component becomes invisible
  useEffect(() => {
    if (!isVisible && selectedSkills.length > 0) {
      setSelectedSkills([]);
      onSkillsChange?.([]);
    }
  }, [isVisible, onSkillsChange, selectedSkills.length]);

  if (!isVisible) return null;

  return (
    <div className="w-full mt-2 xs:mt-3 sm:mt-4">
      <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
        Technical Skills
      </label>
      
      <SelectedRolesPills 
        roles={selectedSkillLabels}
        onRemove={(skill, index) => handleRemoveSkill(skill)} 
      />

      <Dropdown
        options={technicalSkillsOptions}
        placeholder="Select technical skills"
        isMulti
        selectedValues={selectedSkills}
        onSelect={handleSelect}
        displaySelections={false}
        className="w-full"
      />
    </div>
  );
};