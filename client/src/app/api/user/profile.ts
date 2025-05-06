// import axiosInstance from '@/utils/axios/axiosInstance';
// import { ProfileFormData } from '@/features/dashboardView/components/profile/components/profile/types/profileType';

// export const fetchProfile = async (userId: string): Promise<ProfileFormData | null> => {
//   try{
//     const response = await axiosInstance.get("/profile");
//     console.log("user profile  API response:", response.data);
//     return response.data.success ? response.data.data : null;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null; 
//   }
// };

// export const createProfile = async (userId: string, data: ProfileFormData): Promise<void> => {
//     try{
//         const response = await axiosInstance.post("/profile");
//         console.log("user profile  API response:", response.data);
//         return response.data.success ? response.data.data : null;
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         return null; 
//       }
// };

// export const updateProfile = async (userId: string, updates: Partial<ProfileFormData>): Promise<void> => {
//     try{
//         const response = await axiosInstance.put("/profile");
//         console.log("user profile  API response:", response.data);
//         return response.data.success ? response.data.data : null;
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         return null; 
//       }
// };
