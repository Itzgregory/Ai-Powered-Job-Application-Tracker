import React from "react";
import { Interview } from "../../../../../../types/jobs/jobTypes";
import { formatDateTime, getDaysRemaining } from "../util/formatUtil";

const InterviewCard: React.FC<{ interview: Interview }> = ({ interview }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{interview.job.title}</h3>
        <p className="text-gray-600 text-sm">{interview.job.company}</p>
        <div className="flex items-center mt-2">
          <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${interview.mode === 'virtual' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
            {interview.mode}
          </span>
          {interview.location && (
            <span className="text-xs text-gray-500">{interview.location}</span>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-medium text-blue-600">{getDaysRemaining(interview.interviewDate)}</span>
        <p className="mt-1 text-sm font-semibold">{formatDateTime(interview.interviewDate)}</p>
      </div>
    </div>
    
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button className="text-sm text-blue-600 hover:text-blue-800">Add to Calendar</button>
    </div>
  </div>
);

export default InterviewCard;
