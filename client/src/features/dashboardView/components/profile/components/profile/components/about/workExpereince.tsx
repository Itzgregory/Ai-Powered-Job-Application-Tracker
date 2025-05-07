import { Dropdown } from "./dropdownOptions";
import { roleOptions, experienceOptions } from "../../utils/dropdownOptions";

export const ProfileAboutLabelRightExperience = () => (
  <div className="w-full">
    <label className="block mb-2  text-gray-700">Years of experience*</label>
    <Dropdown options={experienceOptions} placeholder="Select experience" />
  </div>
);
