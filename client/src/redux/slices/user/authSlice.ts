import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/user/auth.type";
import { User } from "@/types/user/user.types";
import { setAuthToken, clearAuthData, getAuthToken } from "@/utils/auth/authutils";

interface ExtendedAuthState extends AuthState {
  role: string | null;
  id: string | null;
}

const initialState: ExtendedAuthState = {
  user: null,
  role: null,
  id: null,
  loading: false,
  error: null,
};

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("userRole");
  const storedId = localStorage.getItem("userId");

  initialState.user = storedUser ? JSON.parse(storedUser) : null;
  initialState.role = storedRole || null;
  initialState.id = storedId || null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; role: string; id: string }>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.loading = false;
      state.error = null;

      try {
        // forcing a synchronous update to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("userRole", action.payload.role || "");
        localStorage.setItem("userId", action.payload.id || "");

        // add persistence to sessionStorage for debugging
        sessionStorage.setItem("lastLoginTime", new Date().toISOString());
        sessionStorage.setItem("lastLoginUser", action.payload.id || "");

        if (action.payload.id) {
          const token = action.payload.token || getAuthToken() || "";
          if (!token) {
            console.error("Token is missing in loginSuccess");
            return;
          }

          // ensure token is properly set
          setAuthToken(
            action.payload.id,
            token,
            action.payload.role || "",
            action.payload.user?.firstName || "",
            action.payload.user?.lastName || "",
            action.payload.user?.email || "",
            3600000
          );
          const tokenCheck = getAuthToken();
          if (!tokenCheck) {
            console.error("Token was not set correctly");
            localStorage.setItem("users", JSON.stringify({
              [action.payload.id]: {
                token,
                role: action.payload.role || "",
                expiry: Date.now() + 3600000,
                firstName: action.payload.user?.firstName || "",
                lastName: action.payload.user?.lastName || "",
                email: action.payload.user?.email || ""
              }
            }));
            localStorage.setItem("activeUser", action.payload.id);
            localStorage.setItem("userId", action.payload.id);
          }
        }
      } catch {
        sessionStorage.setItem('emergencyAuthBackup', JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
          role: action.payload.role,
          id: action.payload.id,
          timestamp: Date.now()
        }));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registrationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.id = null;
      clearAuthData();
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registrationStart,
  registrationSuccess,
  registrationFailure,
  logout,
  clearErrors
} = authSlice.actions;

export default authSlice.reducer;
