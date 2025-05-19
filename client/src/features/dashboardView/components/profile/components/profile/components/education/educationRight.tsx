import { EducationList } from "./ViewAndEdit/educationList";
import AddEducation  from "./Create/addEducation";
import { EducationFormConfig } from "../../utils/formEducation";

export const ProfileEduLabelRight = () => (
  <>
    <div className="mt-1 xs:mt-2 sm:mt-4">
      <EducationList formConfig={EducationFormConfig} />
      <AddEducation />
    </div>
  </>
);