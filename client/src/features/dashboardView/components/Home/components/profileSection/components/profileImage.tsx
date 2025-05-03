import   { User } from '../../../../../../../types/user/user.types';
import { getInitials } from '../utls/profileUtils'

interface ProfileImageProps {
  user: User;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  const initials = getInitials(user?.firstName, user?.lastName);
  
  return (
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
  );
};

export default ProfileImage;