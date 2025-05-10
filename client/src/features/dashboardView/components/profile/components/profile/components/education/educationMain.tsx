"use client";
import { ProfileEduLabelLeft } from "./educationLeft";
import { ProfileEduLabelRight } from "./educationRight";

export const Educationmain = () => {
  return (
    <div className="grid mt-3 grid-cols-1 xs:grid-cols-1 sm:grid-cols-12 gap-2 xs:gap-3 sm:gap-4 border-b-2 px-2 xs:px-4 sm:px-6">
      <div className="col-span-1 sm:col-span-4">
        <ProfileEduLabelLeft />
      </div>
      <div className="col-span-1 sm:col-span-8">
        <ProfileEduLabelRight />
      </div>
    </div>
  );
};