import React from "react";
import { AppliedJob } from "@/types/jobs/jobTypes";
// import styles from "../GeneralStyles.module.css";

interface JobsSectionProps {
  jobs: AppliedJob[];
}

const JobsSection: React.FC<JobsSectionProps> = ({ jobs }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-UK', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview-scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">No job applications found. Start applying to see your history here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
              <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
              <p className="text-gray-500 text-xs mt-1">{job.jobType}</p>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}>
                {job.status.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Applied: {formatDate(job.appliedDate)}</span>
            <span>Posted: {formatDate(job.postedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsSection;