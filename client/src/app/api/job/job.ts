import axiosInstance from "@/utils/axios/axiosInstance";
import { 
  Job, 
  AppliedJob, 
  Interview, 
  RecommendedJob, 
  JobDataResponse 
} from "@/types/jobs/jobTypes";


export const fetchPublicJobs = async (): Promise<Job[]> => {
  try {
    const response = await axiosInstance.get("/jobs");
    console.log("Public Jobs API response:", response.data);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching public jobs:", error);
    return []; 
  }
};

export const fetchUserJobs = async (userId: string): Promise<JobDataResponse> => {
    try {
      const response = await axiosInstance.get(`/jobs/user/${userId}`);
      console.log("User Jobs API response:", response.data);
  
      return response.data.success 
        ? response.data 
        : { 
            success: false, 
            message: "Failed to fetch jobs", 
            data: { 
              publicJobs: [], 
              userJobs: { userId, appliedJobs: [], interviews: [], recommendedJobs: [] } 
            } 
          };
    } catch (error) {
      console.error("Error fetching user jobs:", error);
      return { 
        success: false, 
        message: "API error", 
        data: { 
          publicJobs: [], 
          userJobs: { userId, appliedJobs: [], interviews: [], recommendedJobs: [] } 
        } 
      };
    }
  };
  


export const applyForJob = async (userId: string, jobId: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/jobs/apply`, { userId, jobId });
    console.log("Apply for Job API response:", response.data);
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
};


export const fetchAppliedJobs = async (userId: string): Promise<AppliedJob[]> => {
  try {
    const response = await axiosInstance.get(`/jobs/applied/${userId}`);
    console.log("Applied Jobs API response:", response.data);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return [];
  }
};


export const fetchUserInterviews = async (userId: string): Promise<Interview[]> => {
  try {
    const response = await axiosInstance.get(`/jobs/interviews/${userId}`);
    console.log("User Interviews API response:", response.data);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }
};


export const fetchRecommendedJobs = async (userId: string): Promise<RecommendedJob[]> => {
  try {
    const response = await axiosInstance.get(`/jobs/recommended/${userId}`);
    console.log("Recommended Jobs API response:", response.data);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    return [];
  }
};
