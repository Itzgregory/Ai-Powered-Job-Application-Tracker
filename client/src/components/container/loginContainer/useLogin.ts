import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginStart, loginSuccess, loginFailure, logout } from "@/redux/slices/user/authSlice";
import { loginUser } from "@/app/api/user/auth";
import { RootState } from "@/redux/store/store"; 
import { LoginFormData } from "@/types/user/authType";
import { getAuthToken, isTokenValid, setAuthToken } from "@/utils/auth/authutils";

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    dispatch(loginStart());
    setLocalError(null);
  
    try {
      const response = await loginUser(data);
      console.log("Login response:", response); 
  
      // First, explicitly set auth token
      setAuthToken(
        response.id,
        response.token,
        response.role || "",
        response.user?.firstName || "",
        response.user?.lastName || "",
        response.user?.email || "",
        3600000 // 1 hour expiry
      );
  
      // Update Redux state
      dispatch(loginSuccess({ 
        user: response.user,
        token: response.token,
        role: response.role,
        id: response.id
      }));
  
      // Store in sessionStorage for debugging
      sessionStorage.setItem("loginRedirectPending", "true");
      
     // Modify the setTimeout block:
      setTimeout(() => {
        sessionStorage.setItem('lastRedirectAttempt', Date.now().toString());
        
        // Verify ALL auth markers
        const authValid = [
          getAuthToken(),
          isTokenValid(),
          localStorage.getItem('userId'),
          sessionStorage.getItem('emergencyAuthBackup')
        ].some(Boolean);

        if (!authValid) {
          sessionStorage.setItem('redirectFailure', 'true');
          return;
        }

        router.push("/talentdashboard");
      }, 1000);
    } catch (err: any) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || "Login failed";
      dispatch(loginFailure(message));
      setLocalError(message);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return { 
    loading,
    user,
    localError, 
    onSubmit,
    handleLogout
  };
};

export default useLogin;