import { FaExternalLinkAlt, FaEdit } from 'react-icons/fa';

const ProfileActions = () => (
  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2 sm:gap-4">
    <button className="text-[#6b4423] hover:text-[#54361a] flex items-center text-xs sm:text-sm">
      <FaExternalLinkAlt className="mr-1" />
      <span className="hidden sm:inline">View public profile</span>
    </button>
    <button className="text-[#6b4423] hover:text-[#54361a] flex items-center text-xs sm:text-sm">
      <FaEdit className="mr-1" />
      <span className="hidden sm:inline">Edit</span>
    </button>
  </div>
);

export default ProfileActions;