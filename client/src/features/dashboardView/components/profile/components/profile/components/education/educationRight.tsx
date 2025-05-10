import { InputField } from "../about/inputField";
import { FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const ProfileEduLabelRight = () => (
  <>
    <div className="mt-1 xs:mt-2 sm:mt-4">
      <InputField
        label="Website"
        labelIcon={<FaGlobe />}
        labelIconPosition="left" 
        placeholder="Enter..."
        className="w-full gap-2"
      />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4 py-1 xs:py-2 sm:py-6">
      <InputField
        label="LinkedIn"
        labelIcon={<FaLinkedin />}
        labelIconPosition="left" 
        placeholder="Enter..."
        className="w-full gap-2"
      />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4 py-1 xs:py-2 sm:py-6">
      <InputField
        label="GitHub"
        labelIcon={<FaGithub />}
        labelIconPosition="left" 
        placeholder="Enter..."
        className="w-full gap-2"
      />
    </div>

    <div className="mt-1 xs:mt-2 sm:mt-4 py-1 xs:py-2 sm:py-6">
      <InputField
        label="X (Fomerly Twitter)"
        labelIcon={<FaXTwitter />}
        labelIconPosition="left" 
        placeholder="Enter..."
        className="w-full gap-2"
      />
    </div>
  </>
);