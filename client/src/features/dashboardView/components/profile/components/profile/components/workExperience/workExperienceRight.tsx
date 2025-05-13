import AddExperience from "./Create/addExperience";
import { ExperienceList, ExperienceItem } from "./ViewAndEdit/experiencelist";
import { experienceFormConfig } from "../../utils/formExperience";

export const ProfileWorkLabelRight = () => {
  return (
    <div className="mt-1 mb-2 xs:mt-2 sm:mt-4">
      <ExperienceList formConfig={experienceFormConfig} />
      <AddExperience />
    </div>
  );
};