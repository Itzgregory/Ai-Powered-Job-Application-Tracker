'use client';
import {Aboutmain} from "./about/aboutMain"
import {Socialsmain} from "./socials/socialsMain"
import {Educationmain} from "./education/educationMain"
import {Workmain} from "./workExperience/workExperienceMain"
import {Skillmain} from "./skills/SkilllMain"

export function ProfileWrapper() {
  return (
    <header className="shadow-sm w-full">
      <div className="container mx-auto px-4 py-4 max-w-7xl border rounded w-full">
        <div className=" w-full">
          <Aboutmain/>
          <Socialsmain/>
          <Workmain/>
          <Educationmain/>
          <Skillmain/>
        </div>
      </div>
    </header>
  );
}


