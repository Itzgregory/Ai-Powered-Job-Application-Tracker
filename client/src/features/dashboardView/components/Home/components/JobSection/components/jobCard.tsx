import React from "react";
import { AppliedJob } from "../../../../../../../types/jobs/jobTypes";
import { formatDate, getStatusBadgeClass } from "../util/formartDate";

const JobCard: React.FC<{ job: AppliedJob }> = ({ job }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
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
);

export default JobCard;
