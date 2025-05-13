import { InputField } from "./inputField";
import {ImageUpload} from "./avatar";
import {ProfileAboutLabelRightRolesPrimary} from "../about/primaryRoles";
import {ProfileAboutLabelRightExperience} from "../about/workExpereince";
import {ProfileAboutLabelRightrolesOpenedto} from "../about/rolesOpenesto";
import {DescriptionField} from "../about/DescriptionField";
import { FiUser, } from "react-icons/fi"; 
import { FaPen, FaTimes} from "react-icons/fa"; 

export const ProfileAboutLabelRight = () => (
  <>
    <div className="mt-1 xs:mt-2 sm:mt-4">
      <InputField 
        label="Full Name*" 
        placeholder="Enter your name" 
        icon={<FiUser />} 
        className="w-full gap-2" 
        iconPosition="left" 
      />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4 py-1 xs:py-2 sm:py-6">
      <div className="grid grid-cols-1 xs:grid-cols-6 sm:grid-cols-12 gap-2 xs:gap-3 sm:gap-4 w-full">
        <div className="col-span-1 xs:col-span-2 sm:col-span-3">
          <ImageUpload />
        </div>
        <div className="col-span-1 xs:col-span-4 sm:col-span-3 py-1 xs:py-2 sm:py-6">
          <InputField 
            placeholder="Upload your Avatar" 
            disabled 
            className="w-full opacity-70" 
          />
        </div>
        <div className="col-span-1 xs:col-span-6 sm:col-span-6">
        </div>
      </div>
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4">
      <InputField 
        label="Where are you based?*" 
        placeholder="Enter..." 
        icon={<FaTimes />} 
        className="w-full gap-2" 
        iconPosition="right" 
      />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-3 md:mt-4 py-1 xs:py-1.5 sm:py-2 md:py-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 xs:gap-2 sm:gap-3 md:gap-4 w-full md:flex-row md:items-stretch box-border">
        <div className="col-span-1 md:col-span-8">
          <ProfileAboutLabelRightRolesPrimary />
        </div>
        <div className="col-span-1 md:col-span-4">
          <ProfileAboutLabelRightExperience />
        </div>
      </div>
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4">
      <ProfileAboutLabelRightrolesOpenedto />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4 py-1 xs:py-2 sm:py-6">
      <DescriptionField
        className="w-full relative"
        maxLength={160}
        onChange={(value) => console.log("Description:", value)}
      >
        <DescriptionField.Input
          label="Your Bio"
          placeholder="Write a description..."
          icon={<FaPen />}
          iconPosition="left"
          className="w-full gap-2"
        />
        <DescriptionField.Counter />
      </DescriptionField>
    </div>
  </>
);