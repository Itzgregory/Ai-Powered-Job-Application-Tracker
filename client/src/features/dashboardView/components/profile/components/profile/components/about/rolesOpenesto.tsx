import { Dropdown } from "./dropdownOptions";
import { roleOptions,  } from "../../utils/dropdownOptions";

export const ProfileAboutLabelRightrolesOpenedto = () => (
  <div className="w-full">
    <label className="block mt-4 mb-2 text-sm text-gray-700">Open to the following roles</label>
    <Dropdown options={roleOptions} placeholder="Select roles" isMulti />
  </div>
);
