import { Dropdown } from "./dropdownOptions";
import { roleOptions } from "../../utils/dropdownOptions";

export const ProfileAboutLabelRightRolesPrimary = () => (
  <div className="w-full">
    <label className="block mb-2 text-sm text-gray-700">Select your primary role*</label>
    <Dropdown options={roleOptions} placeholder="Choose a role" />
  </div>
);
