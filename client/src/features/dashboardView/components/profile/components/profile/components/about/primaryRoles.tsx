import { useState } from "react";
import { Dropdown } from "./dropdownOptions";
import { roleOptions } from "../../utils/dropdownOptions";

export const ProfileAboutLabelRightRolesPrimary = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <div className="w-full min-h-[68px] xs:min-h-[72px] sm:min-h-[76px] md:min-h-[80px] box-border">
      <label className="block mb-0.5 xs:mb-1 sm:mb-1.5 md:mb-2 text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-700">
        Select your primary role*
      </label>
      <Dropdown 
        options={roleOptions} 
        placeholder="Choose a role"
        selectedValues={selectedValue ? [selectedValue] : []}
        onSelect={(value) => setSelectedValue(Array.isArray(value) ? value[0] : value)}
        displaySelections={true}
        showLabels={true}
        clearable={true} 
        className="w-full"
      />
    </div>
  );
};