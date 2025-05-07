"use client";
import { ProfileAboutLabelLeft } from "./leftLable";
import { ProfileAboutLabelRight } from "./aboutRight";

export const Aboutmain = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <ProfileAboutLabelLeft />
      </div>
      <div className="col-span-8 ">
        <ProfileAboutLabelRight />
      </div>
    </div>
  );
};


