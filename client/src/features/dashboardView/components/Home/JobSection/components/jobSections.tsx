import React from "react";
import JobCard from "./jobCard";
import JobsSectionProps from "../types/type"

const JobsSection: React.FC<JobsSectionProps> = ({ jobs }) => {
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
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsSection;
