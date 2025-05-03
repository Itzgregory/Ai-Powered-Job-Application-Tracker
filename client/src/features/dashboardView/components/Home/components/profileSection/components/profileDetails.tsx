import React from "react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

interface ProfileDetailsProps {
  user: { currentRole?: string; currentCompany?: string; location?: string };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => (
  <div className="space-y-2">
    {user.currentRole && (
      <div className="flex items-center">
        <FaBriefcase className="mr-2 text-[#6b4423]" />
        <span>{user.currentRole} {user.currentCompany && `at ${user.currentCompany}`}</span>
      </div>
    )}
    {user.location && (
      <div className="flex items-center">
        <FaMapMarkerAlt className="mr-2 text-[#6b4423]" />
        <span>{user.location}</span>
      </div>
    )}
  </div>
);

export default ProfileDetails;
