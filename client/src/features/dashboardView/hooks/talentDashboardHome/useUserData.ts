import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { fetchUserDetails, updateUserProfile } from '@/app/api/user/auth';
import { loginSuccess, loginFailure } from '@/redux/slices/user/authSlice';
import { getAuthToken, getUserRole } from '@/utils/auth/authutils';
import { getErrorMessage } from '../../types/api/api';

export const useUserData = () => {
  const dispatch = useDispatch();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.id) || localStorage.getItem("userId");

  const fetchProfile = async () => {
    if (!userId) {
      setProfileError("User ID not found.");
      setProfileLoading(false);
      return;
    }
    
    try {
      setProfileLoading(true);
      const userData = await fetchUserDetails(userId);
      dispatch(loginSuccess({ 
        user: userData, 
        token: getAuthToken() || "", 
        role: getUserRole() || "", 
        id: userId 
      }));
      localStorage.setItem('userProfile', JSON.stringify({
        data: userData,
        lastUpdated: Date.now(),
      }));
    } catch (err) {
      const message = getErrorMessage(err);
      setProfileError(message);
      dispatch(loginFailure(message));
    } finally {
      setProfileLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'ready' | 'open' | 'closed') => {
    if (!userId) {
      setProfileError("User ID not found.");
      return;
    }

    try {
      await updateUserProfile(userId, { jobStatus: newStatus });
      const userData = await fetchUserDetails(userId);
      dispatch(loginSuccess({ 
        user: userData, 
        token: getAuthToken() || "", 
        role: getUserRole() || "", 
        id: userId 
      }));
      localStorage.setItem('userProfile', JSON.stringify({
        data: userData,
        lastUpdated: Date.now(),
      }));
    } catch (err) {
      const message = getErrorMessage(err);
      setProfileError(message);
      dispatch(loginFailure(message));
    }
  };

  useEffect(() => {
    if (!user && userId) {
      fetchProfile();
    } else {
      setProfileLoading(false);
    }
  }, [user, userId]);

  return { 
    user, 
    profileLoading, 
    profileError, 
    handleStatusChange,
    fetchProfile
  };
};