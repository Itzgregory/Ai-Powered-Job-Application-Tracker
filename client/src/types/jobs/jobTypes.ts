
export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description?: string;
    salaryRange?: string;
    jobType: "full-time" | "part-time" | "contract" | "internship";
    postedAt: string;
  }
  

  export interface AppliedJob extends Job {
    appliedDate: string;
    status: "pending" | "interview-scheduled" | "rejected" | "accepted";
  }
  

  export interface Interview {
    id: string;
    job: Job;
    interviewDate: string;
    mode: "virtual" | "physical";
    location?: string; 
    status: "upcoming" | "completed" | "canceled";
  }
  

  export interface RecommendedJob extends Job {
    recommendationScore: number; 
  }
  

  export interface UserJobData {
    userId: string;
    appliedJobs: AppliedJob[];
    interviews: Interview[];
    recommendedJobs: RecommendedJob[];
  }
  

export interface JobDataResponse {
    success: boolean;
    message: string;
    data: {
      publicJobs: Job[];
      userJobs: UserJobData | null; 
    };
}
  