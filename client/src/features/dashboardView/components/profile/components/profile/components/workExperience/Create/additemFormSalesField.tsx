import { InputField } from "../../about/inputField";
import { Dropdown } from "../../about/dropdownOptions";
import { SelectedRolesPills } from "../../about/dropdownselectedrolespill";
import { FiBriefcase } from "react-icons/fi";
import { useAddItemFormContext } from "./addItemContext";
import { salesAudienceOptions } from "../../../utils/formExperience";

export const AddItemFormSalesFields: React.FC = () => {
  const { formState, updateField } = useAddItemFormContext();

  if (formState.roleType !== "sales") return null;

  const handleSalesAudienceChange = (values: string[]) => {
    updateField("salesAudience", values);
  };

  const getSalesAudienceLabels = () => {
    const audiences = (formState.salesAudience as string[]) || [];
    return audiences.map((value) => {
      const option = salesAudienceOptions.find((opt) => opt.value === value);
      return option?.label || value;
    });
  };

  const handleRemoveSalesAudience = (_: any, index: number) => {
    const audiences = [...((formState.salesAudience as string[]) || [])];
    audiences.splice(index, 1);
    updateField("salesAudience", audiences);
  };

  return (
    <>
      <div className="mb-2 xs:mb-3 sm:mb-4">
        <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
          Sales Audience
        </label>
        <SelectedRolesPills roles={getSalesAudienceLabels()} onRemove={handleRemoveSalesAudience} />
        <Dropdown
          name="salesAudience"
          options={salesAudienceOptions}
          placeholder="Who did you sell to?"
          isMulti={true}
          selectedValues={(formState.salesAudience as string[]) || []}
          onSelect={(val) => handleSalesAudienceChange(Array.isArray(val) ? val : [val])}
          className="w-full text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
          displaySelections={false}
        />
      </div>
      <div className="mb-2 xs:mb-3 sm:mb-4">
        <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
          Quota
        </label>
        <InputField
          name="quota"
          placeholder="Quota (e.g., $500k)"
          value={(formState.quota as string) || ""}
          onChange={(val) => updateField("quota", val)}
          icon={<FiBriefcase />}
          iconPosition="left"
          className="w-full gap-2 text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
        />
      </div>
      <div className="mb-2 xs:mb-3 sm:mb-4">
        <label className="block mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base text-gray-700">
          Average Deal Size
        </label>
        <InputField
          name="avgDealSize"
          placeholder="Average deal size (e.g., $10k)"
          value={(formState.avgDealSize as string) || ""}
          onChange={(val) => updateField("avgDealSize", val)}
          icon={<FiBriefcase />}
          iconPosition="left"
          className="w-full gap-2 text-xs xs:text-sm sm:text-base border-gray-300 focus:ring-[--primary-color]"
        />
      </div>
    </>
  );
};