import axiosInstance from "@/utils/axios/axiosInstance";
import { capitalizeFirstLetter } from "@/utils/formating/cases";
import { User, RegistrationFormData, LoginFormData } from "@/types/user/authType";

export const registerUser = async (data: RegistrationFormData): Promise<void> => {
  try {
    const response = await axiosInstance.post("/signup", data);
    console.log("Registration API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
};

export const loginUser = async (
  data: LoginFormData
): Promise<{ user: User; token: string; role: string; id: string }> => {
  try {
    const response = await axiosInstance.post("/login", data);
    console.log("API response:", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    const responseData = response.data.data;
    console.log("Extracted user data:", responseData);

    return {
      user: {
        email: responseData.email,
        firstName: capitalizeFirstLetter(responseData.firstName),
        lastName: capitalizeFirstLetter(responseData.lastName),
      },
      token: responseData.token,
      role: responseData.role,
      id: responseData.id,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchUserDetails = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  return axiosInstance.post("/logout");
};