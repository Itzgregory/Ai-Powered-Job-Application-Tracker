import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registrationStart, registrationSuccess, registrationFailure } from "@/redux/slices/user/authSlice";
import {registerUser} from "@/app/api/user/auth";
import { RootState } from "@/redux/store/store";
import { RegistrationFormData } from "@/types/user/authType";

const useRegistration = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    if (data.password !== data.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(registrationStart());
    setLocalError(null);

    try {
      const response = await registerUser(data);
      console.log("Registration response:", response);
      
      dispatch(registrationSuccess());
      // to ensure state updates before navigation
      setTimeout(() => {
        console.log("Redirecting to login after registration");
        router.push("/login");
      }, 200);
    } catch (err: any) {
      console.error("Registration error:", err);
      const message = err.response?.data?.message || "Registration failed";
      dispatch(registrationFailure(message));
      setLocalError(message);
    }
  };

  return { 
    loading, 
    localError: localError || error, 
    onSubmit 
  };
};

export default useRegistration;