import { AppliedJob, Interview }from '../../../../types/jobs/jobTypes';

interface DashboardStats {
  title: string;
  count: number;
}

export const useDashboardStats = (appliedJobs: AppliedJob[], interviews: Interview[]) => {
  const upcomingInterviews = interviews.filter(interview => 
    interview.status === 'upcoming'
  ).length;

  const activeApplications = appliedJobs.filter(job => 
    job.status === 'pending' || job.status === 'interview-scheduled'
  ).length;

  const stats: DashboardStats[] = [
    { title: 'Applied Jobs', count: appliedJobs.length },
    { title: 'Upcoming Interviews', count: upcomingInterviews },
    { title: 'Active Applications', count: activeApplications },
  ];

  return { stats, upcomingInterviews };
};