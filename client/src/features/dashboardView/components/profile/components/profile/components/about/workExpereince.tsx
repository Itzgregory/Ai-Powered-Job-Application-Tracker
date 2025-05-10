import { useState } from "react";
import { Dropdown } from "./dropdownOptions";
import { experienceOptions } from "../../utils/dropdownOptions";

export const ProfileAboutLabelRightExperience = () => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  return (
    <div className="w-full min-h-[68px] xs:min-h-[72px] sm:min-h-[76px] md:min-h-[80px] box-border">
      <label className="block mb-0.5 xs:mb-1 sm:mb-1.5 md:mb-2 text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-700">
        Years of experience*
      </label>
      <Dropdown
        options={experienceOptions}
        placeholder="Select experience"
        displaySelections={true}
        showLabels={true}
        clearable={true}
        selectedValues={selectedExperience ? [selectedExperience] : []}
        onSelect={(value) => setSelectedExperience(Array.isArray(value) ? value[0] : value)}
        className="w-full"
      />
    </div>
  );
};