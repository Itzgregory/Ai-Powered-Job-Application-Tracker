import axiosInstance from '@/utils/axios/axiosInstance';
import { ProfileFormData } from '@/features/dashboardView/components/profile/components/profile/types/profileType';

export const createProfile = async (data: ProfileFormData): Promise<void> => {
    try{
        const response = await axiosInstance.post("/talent/edit/profile");
        console.log("user profile  API response:", response.data);
        if (!response.data.success) {
            console.error("Profile creation failed.");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};