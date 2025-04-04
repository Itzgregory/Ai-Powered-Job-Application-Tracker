import React from "react";
import { Interview } from "@/types/jobs/jobTypes";
import styles from "../GeneralStyles.module.css";

interface InterviewsSectionProps {
  interviews: Interview[];
}

const InterviewsSection: React.FC<InterviewsSectionProps> = ({ interviews }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-Uk', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const interviewDate = new Date(dateString);
    interviewDate.setHours(0, 0, 0, 0);
    
    const diffTime = interviewDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return 'Past due';
    return `In ${diffDays} days`;
  };

  if (interviews.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">No upcoming interviews. Keep applying!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {interviews.map((interview) => (
        <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md">
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
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Add to Calendar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewsSection;