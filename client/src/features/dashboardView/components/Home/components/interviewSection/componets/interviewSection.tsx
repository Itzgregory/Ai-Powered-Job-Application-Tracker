import React from "react";
import InterviewCard from "./interviewCard";
import  InterviewsSectionProps from "../type/types"


const InterviewsSection: React.FC<InterviewsSectionProps> = ({ interviews }) => {
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
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export default InterviewsSection;
