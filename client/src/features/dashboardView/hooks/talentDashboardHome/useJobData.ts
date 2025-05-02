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
import { fetchPublicJobs, fetchAppliedJobs, fetchUserInterviews } from '@/app/api/job/job';
import { getErrorMessage } from '../../types/api/api';

export const useJobData = (userId: string | null) => {
  const dispatch = useDispatch();
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);
  const { jobs, appliedJobs, interviews } = useSelector((state: RootState) => state.job);

  const fetchAllJobData = async () => {
    if (!userId) {
      setJobError("User ID not found.");
      setJobLoading(false);
      return;
    }

    setJobLoading(true);
    setJobError(null);

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
      setJobError(message);
      dispatch(fetchAppliedJobsFailure(message));
      dispatch(fetchInterviewsFailure(message));
      dispatch(fetchJobsFailure(message));
    } finally {
      setJobLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobData();
  }, [userId]);

  return { 
    jobs, 
    appliedJobs, 
    interviews, 
    jobLoading, 
    jobError,
    refetchJobs: fetchAllJobData
  };
};