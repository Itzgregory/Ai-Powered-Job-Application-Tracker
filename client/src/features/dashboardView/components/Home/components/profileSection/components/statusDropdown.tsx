
import {statusOptions} from '../utls/profileUtils'
import { useState, useRef, useEffect, useCallback } from 'react';
import {  FaChevronDown } from 'react-icons/fa';
import { User, JobStatus } from '../../../../../../../types/user/user.types';


interface StatusDropdownProps {
  user: User | null;
  icon ?: string;
  handleStatusChange: (newStatus: JobStatus) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ 
  user, 
  handleStatusChange 
}) => {
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


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

  const handleStatusSelect = useCallback((value: JobStatus) => {
    setIsDropdownOpen(false);
    handleStatusChange(value);
  }, [handleStatusChange]);

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="font-bold text-sm sm:text-base text-[#333333] mb-1">
        Job search status
      </h3>
      <p className="text-xs sm:text-sm text-[#666666] mb-3">
        Update your status to inform employers
      </p>
      <div 
        ref={dropdownRef} 
        className="relative w-full sm:w-[35%] min-w-[200px]"
        onMouseEnter={() => setShowStatusTooltip(true)}
        onMouseLeave={() => setShowStatusTooltip(false)}
      >
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

        {showStatusTooltip && !isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 p-3 bg-black text-white text-xs sm:text-sm rounded-md shadow-lg">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black"></div>
            Your status determines how we surface new opportunities to you
          </div>
        )}

        {isDropdownOpen && (
          <div className="absolute w-full p-2 sm:w-[35%] min-w-[200px] mt-1 border border-[#E0E0E0] rounded-md shadow-lg bg-white z-10">
            {statusOptions.map(option => (
              <div 
                key={option.value} 
                className={`p-3 hover:bg-[#f7f7f7] cursor-pointer ${user?.jobStatus === option.value ? 'bg-[#f0e6d9]' : ''}`}
                onClick={() => handleStatusSelect(option.value as JobStatus)}
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
  );
};

export default StatusDropdown;