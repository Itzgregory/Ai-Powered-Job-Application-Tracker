import { InputField } from "./inputField";
import {ImageUpload} from "./avatar"
import { FiUser, } from "react-icons/fi"; 
import { FaTimes} from "react-icons/fa"; 

export const ProfileAboutLabelRight = () => (
  <>
    <div className="mt-4">
    <InputField label="Full Name*" placeholder="Enter your name" icon={<FiUser />} className="w-full gap-2" iconPosition="left" />
    </div>

    <div className="mt-4 flex flex-nowrap py-6">
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-3">
          <ImageUpload />
        </div>
        <div className="col-span-3 py-6">
          <InputField placeholder="Upload your Avatar" disabled className="w-" />
        </div>
        <div className="col-span-8">
        </div>
      </div>
    </div>

    <div className="mt-4">
    <InputField label="Where are you based?*" placeholder="Enter..." icon={<FaTimes />} className="w-full gap-2" iconPosition="right" />
    </div>
    
  </>
);
