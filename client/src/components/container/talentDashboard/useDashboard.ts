import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { 
  fetchJobsStart, 
  fetchJobsSuccess, 
  fetchJobsFailure,
  fetchAppliedJobsStart,
  fetchAppliedJobsSuccess,
  fetchAppliedJobsFailure,
  fetchInterviewsStart,
  fetchInterviewsSuccess,
  fetchInterviewsFailure
} from '@/redux/slices/jobs/jobSlice';
import { 
  fetchPublicJobs, 
  fetchAppliedJobs, 
  fetchUserInterviews 
} from '@/app/api/job/job';
import { fetchUserDetails, updateUserProfile } from '@/app/api/user/auth';
import { loginSuccess, loginFailure } from '@/redux/slices/user/authSlice';
import { getAuthToken, getUserRole } from '@/utils/auth/authutils';
import { getErrorMessage } from '../../../types/api/api';

export const useDashboardData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const { error: authError } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  const { jobs, appliedJobs, interviews } = useSelector((state: RootState) => state.job);
  const userId = useSelector((state: RootState) => state.auth.id) || localStorage.getItem("userId");

  useEffect(() => {
    const loadProfileData = async () => {
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
        console.error("Failed to fetch profile:", message);
        setProfileError(message);
        dispatch(loginFailure(message));
      } finally {
        setProfileLoading(false);
      }
    };

    if (!user && userId) {
      loadProfileData();
    } else {
      setProfileLoading(false);
    }
  }, [dispatch, user, userId]);

  useEffect(() => {
    const loadJobData = async () => {
      if (!userId) {
        setLocalError("User ID not found.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setLocalError(null);

      try {
        dispatch(fetchAppliedJobsStart());
        const appliedJobsData = await fetchAppliedJobs(userId);
        dispatch(fetchAppliedJobsSuccess(appliedJobsData));

        dispatch(fetchInterviewsStart());
        const interviewsData = await fetchUserInterviews(userId);
        dispatch(fetchInterviewsSuccess(interviewsData));

        dispatch(fetchJobsStart());
        const jobsData = await fetchPublicJobs();
        dispatch(fetchJobsSuccess(jobsData));
      } catch (err) {
        const message = getErrorMessage(err);
        console.error('Failed to fetch job data:', message);
        setLocalError(message);
        dispatch(fetchAppliedJobsFailure(message));
        dispatch(fetchInterviewsFailure(message));
        dispatch(fetchJobsFailure(message));
      } finally {
        setLoading(false);
      }
    };

    loadJobData();
  }, [dispatch, userId]);

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
      console.error("Failed to update job status:", message);
      setProfileError(message);
      dispatch(loginFailure(message));
    }
  };

  const [localError, setLocalError] = useState<string | null>(null);
  const upcomingInterviews = interviews.filter(interview => 
    interview.status === 'upcoming'
  ).length;

  const stats = [
    { title: 'Applied Jobs', count: appliedJobs.length },
    { title: 'Upcoming Interviews', count: upcomingInterviews },
    { title: 'Active Applications', count: appliedJobs.filter(job => job.status === 'pending').length },
  ];

  return {
    loading: loading || profileLoading,
    localError: localError || authError || profileError,
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