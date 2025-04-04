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
import { fetchUserDetails } from '@/app/api/user/auth';
import { loginSuccess } from '@/redux/slices/user/authSlice';
import { getAuthToken, getUserRole } from '@/utils/auth/authutils';

export const useDashboardData = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { error } = useSelector((state: RootState) => state.auth);
    const [localError, setLocalError] = useState<string | null>(null);
    const user = useSelector((state:RootState) => state.auth.user);
    const { jobs, appliedJobs, interviews} = useSelector((state:RootState) => state.job);
    const userId = useSelector((state: RootState) => state.auth.id) || localStorage.getItem("userId");

    useEffect(() => {
      const loadedUserDetails = async () => {
        if (!userId) {
          console.warn("No userId found in state or localStorage");
          return;
        }
      
        try {
          console.log("Fetching user details for ID:", userId);
          const userData = await fetchUserDetails(userId);
          console.log("Fetched User Data:", userData);
      
          if (!userData) {
            console.warn("User data is empty");
            setLocalError("User data could not be loaded.");
            return;
          }
      
          dispatch(loginSuccess({ 
            user: userData, 
            token: getAuthToken() || "", 
            role: getUserRole() || "", 
            id: userId 
          }));
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setLocalError("Failed to load user details");
        }
      };
      const userInState = !!user;
      const userInStorage = !!localStorage.getItem("user");
      
      console.log("User in state:", userInState, "User in localStorage:", userInStorage);
      
      if (!userInState) {
        loadedUserDetails();
      }
    }, [dispatch, user, userId]);

    useEffect(() => {
        const loadJobData = async () => {
          if (!userId) return;
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
          } catch (err: any) {
            console.error('Failed to fetch job data:', err);
            setLocalError('Failed to load job data');
            dispatch(fetchAppliedJobsFailure('Failed to fetch applied jobs'));
            dispatch(fetchInterviewsFailure('Failed to fetch interviews'));
            dispatch(fetchJobsFailure('Failed to fetch jobs'));
          } finally {
            setLoading(false);
          }
        };
    
        loadJobData();
      }, [dispatch, userId]);
    
      const upcomingInterviews = interviews.filter(interview => 
        interview.status === 'upcoming'
      ).length;
    
      const stats = [
        { title: 'Applied Jobs', count: appliedJobs.length },
        { title: 'Upcoming Interviews', count: upcomingInterviews },
        { title: 'Active Applications', count: appliedJobs.filter(job => job.status === 'pending').length },
      ];
    
      return {
        loading,
        localError: localError || error,
        user,
        jobs,
        appliedJobs,
        interviews,
        stats,
        upcomingInterviews
      };
};