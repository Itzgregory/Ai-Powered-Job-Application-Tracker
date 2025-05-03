import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { ProfileSectionProps } from '../types/profileTypes';
import ProfileSkeleton from './profileSkeleton';
import StatusDropdown from './statusDropdown';
import ProfileHeader from './profileHeader';
import ProfileImage from './profileImage';
import RoleLocationInfo from './profileDetails';
import ProfileActions from './profileActions';


const ProfileSection: React.FC<ProfileSectionProps> = memo(({ 
  user, 
  loading, 
  error, 
  lastUpdated, 
  handleStatusChange 
}) => {
  if (loading && !user) return <ProfileSkeleton />;
  if (!user) return <div className="text-red-500 p-4">{error || 'Profile not available'}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 relative">
      <ProfileActions />
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <ProfileImage user={user} />
        
        <div className="flex-1 space-y-2 sm:space-y-4">
          <ProfileHeader user={user} lastUpdated={lastUpdated} />
          <RoleLocationInfo user={user} />
          <StatusDropdown 
            user={user} 
            handleStatusChange={handleStatusChange} 
          />
        </div>
      </div>
    </div>
  );
});

ProfileSection.displayName = 'ProfileSection';
export default ProfileSection;