  "use client";
import { ProfileSkillLabelLeft } from "./SkillLeft";
import { ProfileSkillLabelRight } from "./SkillRight";

export const Skillmain = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-12 gap-2 xs:gap-3 sm:gap-4 border-b-2 px-2 xs:px-4 sm:px-6">
      <div className="col-span-1 sm:col-span-4">
        <ProfileSkillLabelLeft />
      </div>
      <div className="col-span-1 sm:col-span-8">
        <ProfileSkillLabelRight />
      </div>
    </div>

    
  );
};

