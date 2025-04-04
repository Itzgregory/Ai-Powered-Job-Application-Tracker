import axios from "axios";
import { getAuthToken, isTokenValid, clearAuthData } from "@/utils/auth/authutils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track 401 errors to prevent infinite redirect loops
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const valid = isTokenValid();
    console.log("Request Debug - Token:", { token, valid });

    if (token && valid) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Handle 401 and 403 errors
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      isRefreshing = true;
      console.log("Unauthorized request detected, handling session expiration");

      // Dispatch an event that the AuthContext can listen for
      window.dispatchEvent(new Event("auth:expired"));

      // Clear auth data and redirect to login
      clearAuthData();
      window.location.href = "/login";
    }

    return Promise.reject(error);
    
  }
);

export default axiosInstance;