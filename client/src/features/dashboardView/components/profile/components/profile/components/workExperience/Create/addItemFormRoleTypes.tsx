import { Dropdown } from "../../about/dropdownOptions";
import { useAddItemFormContext } from "./addItemContext";
import { roleOptions } from "../../../utils/formExperience";

export const AddItemFormRoleType: React.FC = () => {
  const { formConfig, formState, updateField } = useAddItemFormContext();

  const handleRoleTypeSelect = (value: string | string[]) => {
    const roleType = Array.isArray(value) ? value[0] : value;
    const newState = { ...formState, roleType };

    if (roleType === "technical") {
      delete newState.salesAudience;
      delete newState.quota;
      delete newState.avgDealSize;
    } else if (roleType === "sales") {
      delete newState.technicalSkills;
    } else {
      delete newState.salesAudience;
      delete newState.quota;
      delete newState.avgDealSize;
      delete newState.technicalSkills;
    }

    updateField("roleType", roleType);
  };

  const getRoleTypeLabel = () => {
    const roleType = formState.roleType as string;
    return roleOptions.find((option) => option.value === roleType)?.label || roleType;
  };

  const handleRemoveRoleType = () => {
    const newState = { ...formState };
    delete newState.roleType;
    delete newState.salesAudience;
    delete newState.quota;
    delete newState.avgDealSize;
    delete newState.technicalSkills;
    updateField("roleType", null);
  };

  return (
    <div className="mb-2 xs:mb-3 sm:mb-4">
      <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
        {formConfig.primaryField?.label || "Role Type"}
      </label>

      {formState.roleType && (
        <div className="flex flex-wrap gap-1 xs:gap-2 mb-1 xs:mb-2">
          <div className="flex items-center bg-gray-100 rounded-full px-1 xs:px-2 sm:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs sm:text-sm">
            {getRoleTypeLabel()}
            <button
              onClick={handleRemoveRoleType}
              className="ml-0.5 xs:ml-1 sm:ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      <Dropdown
        name={formConfig.primaryField?.key}
        options={formConfig.primaryField?.options || []}
        placeholder={formConfig.primaryField?.placeholder || "Select role type"}
        selectedValues={formState.roleType ? [formState.roleType as string] : []}
        onSelect={handleRoleTypeSelect}
        className="w-full text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
        displaySelections={false}
      />
    </div>
  );
};