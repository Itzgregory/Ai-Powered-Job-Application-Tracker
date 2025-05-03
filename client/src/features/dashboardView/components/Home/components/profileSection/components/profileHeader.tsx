import React from "react";

interface ProfileHeaderProps {
    user: {
      firstName?: string;
      lastName?: string;
    };
    lastUpdated: number | null;
  }

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, lastUpdated }) => (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#004d40] break-words">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500">
        Updated: {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Never'}
      </p>
    </div>
  );

export default ProfileHeader;

