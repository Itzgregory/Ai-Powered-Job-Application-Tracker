import { useState, useMemo } from "react";
import { Dropdown } from "./dropdownOptions";
import { roleOptions } from "../../utils/dropdownOptions";
import { SelectedRolesPills } from "./dropdownselectedrolespill";

export const ProfileAboutLabelRightrolesOpenedto = ({
  onRolesChange,
  initialRoles = [],
}: {
  onRolesChange?: (roles: string[]) => void;
  initialRoles?: string[];
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialRoles);

  const selectedLabels = useMemo(() => {
    return selectedValues.map(value => {
      const option = roleOptions.find(opt => opt.value === value);
      return option?.label || value;
    });
  }, [selectedValues]);

  const handleSelect = (value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value];
    setSelectedValues(values);
    onRolesChange?.(values);
  };

  const handleRemoveRole = (valueToRemove: string) => {
    const updatedValues = selectedValues.filter(v => v !== valueToRemove);
    setSelectedValues(updatedValues);
    onRolesChange?.(updatedValues);
  };

  return (
    <div className="w-full">
      <label className="block mt-1 xs:mt-2 sm:mt-4 mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
        Open to the following roles
      </label>
      
      <SelectedRolesPills 
        roles={selectedLabels}
        onRemove={(_, index) => handleRemoveRole(selectedValues[index])} 
      />

      <Dropdown
        options={roleOptions}
        placeholder="Select roles"
        isMulti
        selectedValues={selectedValues}
        onSelect={handleSelect}
        displaySelections={false}
        className="w-full"
      />
    </div>
  );
};