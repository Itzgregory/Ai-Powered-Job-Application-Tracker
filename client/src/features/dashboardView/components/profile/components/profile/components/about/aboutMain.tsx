"use client";
import { ProfileAboutLabelLeft } from "./aboutLeft";
import { ProfileAboutLabelRight } from "./aboutRight";

export const Aboutmain = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-12 gap-2 xs:gap-3 sm:gap-4 border-b-2 px-2 xs:px-4 sm:px-6">
      <div className="col-span-1 sm:col-span-4">
        <ProfileAboutLabelLeft />
      </div>
      <div className="col-span-1 sm:col-span-8">
        <ProfileAboutLabelRight />
      </div>
    </div>
  );
};