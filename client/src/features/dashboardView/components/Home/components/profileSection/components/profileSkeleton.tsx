import { memo } from 'react';

const ProfileSkeleton = memo(() => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-pulse">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300" />
      <div className="flex-1 space-y-3">
        <div className="h-6 w-3/4 sm:w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-full sm:w-2/3 bg-gray-300 rounded" />
        <div className="h-10 w-full bg-gray-300 rounded" />
      </div>
    </div>
  </div>
));

ProfileSkeleton.displayName = 'ProfileSkeleton';
export default ProfileSkeleton;