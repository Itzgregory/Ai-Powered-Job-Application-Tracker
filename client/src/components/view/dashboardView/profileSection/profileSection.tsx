'use client';
import { FaBriefcase, FaMapMarkerAlt, FaEdit, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { ProfileSectionProps } from '@/types/user/authType';

const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

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

const ProfileSection: React.FC<ProfileSectionProps> = memo(({ 
  user, 
  loading, 
  error, 
  lastUpdated, 
  handleStatusChange 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    {
      value: 'ready',
      label: 'Ready to interview',
      summary: 'Actively looking and available for interviews',
      icon: <FaBriefcase className="text-green-500 mr-2" />
    },
    {
      value: 'open',
      label: 'Open to offers',
      summary: 'Not actively searching but open to opportunities',
      icon: <FaBriefcase className="text-blue-500 mr-2" />
    },
    {
      value: 'closed',
      label: 'Closed to offers',
      summary: 'Not interested in new opportunities',
      icon: <FaBriefcase className="text-gray-500 mr-2" />
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStatus = statusOptions.find(opt => opt.value === (user?.jobStatus || 'ready'));
  const initials = getInitials(user?.firstName, user?.lastName);

  const handleStatusSelect = useCallback((value: 'ready' | 'open' | 'closed') => {
    setIsDropdownOpen(false);
    handleStatusChange(value);
  }, [handleStatusChange]);

  if (loading && !user) return <ProfileSkeleton />;
  if (!user) return <div className="text-red-500 p-4">{error || 'Profile not available'}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 relative">
      {/* Top Right Buttons - Mobile first approach */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2 sm:gap-4">
        <button className="text-[#6b4423] hover:text-[#54361a] flex items-center text-xs sm:text-sm">
          <FaExternalLinkAlt className="mr-1" /> <span className="hidden sm:inline">View public profile</span>
        </button>
        <button className="text-[#6b4423] hover:text-[#54361a] flex items-center text-xs sm:text-sm">
          <FaEdit className="mr-1" /> <span className="hidden sm:inline">Edit</span>
        </button>
      </div>

      {/* Main Profile Content */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0 self-center sm:self-start">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#6b4423]"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#6b4423] bg-[#f0e6d9] flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-[#6b4423]">{initials}</span>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-2 sm:space-y-4">
          {/* Name and Update Info - Prioritized for mobile */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#004d40] break-words">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Updated: {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Never'}
            </p>
          </div>

          {/* Role and Location - Second priority for mobile */}
          <div className="space-y-1">
            {user.currentRole && (
              <div className="flex items-center text-sm sm:text-base text-[#333333]">
                <FaBriefcase className="mr-2 text-[#6b4423] flex-shrink-0" />
                <span className="break-words">
                  {user.currentRole}
                  {user.currentCompany && ` at ${user.currentCompany}`}
                </span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-sm sm:text-base text-[#666666]">
                <FaMapMarkerAlt className="mr-2 text-[#6b4423] flex-shrink-0" />
                <span className="break-words">{user.location}</span>
              </div>
            )}
          </div>

          {/* Job Search Status - Full width on mobile */}
          <div className="mt-4 sm:mt-6">
            <h3 className="font-bold text-sm sm:text-base text-[#333333] mb-1">
              Job search status
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mb-3">
              Update your status to inform employers
            </p>
            
            <div ref={dropdownRef} className="w-full sm:w-[35%] min-w-[200px]">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 sm:p-3 border border-[#E0E0E0] rounded-md bg-white text-left flex justify-between items-center hover:border-[#6b4423] transition-colors"
              >
                <div className="flex items-center truncate">
                  {currentStatus?.icon}
                  <span className="truncate text-sm sm:text-base">{currentStatus?.label}</span>
                </div>
                <FaChevronDown className={`text-[#6b4423] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute w-full sm:w-[35%] min-w-[200px] mt-1 border border-[#E0E0E0] rounded-md shadow-lg bg-white z-10">
                  {statusOptions.map(option => (
                    <div 
                      key={option.value}
                      className={`p-3 hover:bg-[#f7f7f7] cursor-pointer ${user.jobStatus === option.value ? 'bg-[#f0e6d9]' : ''}`}
                      onClick={() => handleStatusSelect(option.value as 'ready' | 'open' | 'closed')}
                    >
                      <div className="flex items-center">
                        {option.icon}
                        <span className="font-medium text-sm sm:text-base">{option.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#666666] mt-1 ml-6">{option.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileSection.displayName = 'ProfileSection';
export default ProfileSection;