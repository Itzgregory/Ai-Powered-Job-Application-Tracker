import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useUserData } from './useUserData';
import { useJobData } from './useJobData';
import { useDashboardStats } from './useDashboardStats';

export const useDashboardData = () => {
  const userId = useSelector((state: RootState) => state.auth.id) || localStorage.getItem("userId");
  const { error: authError } = useSelector((state: RootState) => state.auth);
  
  const { 
    user, 
    profileLoading, 
    profileError, 
    handleStatusChange 
  } = useUserData();


  const { 
    jobs, 
    appliedJobs, 
    interviews, 
    jobLoading, 
    jobError 
  } = useJobData(userId);


  const { 
    stats, 
    upcomingInterviews 
  } = useDashboardStats(appliedJobs, interviews);

  return {
    loading: jobLoading || profileLoading,
    localError: jobError || authError || profileError,
    user,
    jobs,
    appliedJobs,
    interviews,
    stats,
    upcomingInterviews,
    handleStatusChange,
    lastUpdated: user ? Date.now() : null
  };
};