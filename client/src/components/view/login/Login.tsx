"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from "@/components/container/loginContainer/useLogin";
import EmailModal from "../modals/passwordreset/Sendemail/emailModal";
import SuccessModal from "../modals/successModal/successModal"; 
import styles from "./Login.module.css";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { loading, user, localError, onSubmit, handleLogout } = useLogin();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleForgotPasswordSubmit = async (email: string) => {
    try {
      const response = await fetch("/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsEmailModalOpen(false);
        setIsSuccessModalOpen(true); 
      } else {
        alert("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting forgot password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // if (user) {
  //   return (
  //     <div className={`${styles.container} flex flex-col items-center justify-center h-screen`}>
  //       <p className={`${styles.welcomeText} text-lg font-semibold`}>Welcome, {user.email}</p>
  //       <button
  //         onClick={handleLogout}
  //         className={`${styles.logoutButton} mt-4 px-4 py-2 bg-red-500 text-white rounded-md`}
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className={`${styles.loginContainer} flex flex-col items-center justify-center h-screen bg-gray-100`}>
      <h1 className={`${styles.titleDark} text-3xl font-bold mb-6`}>Welcome back</h1>
      <div className={`${styles.loginCard} bg-white p-6 rounded-lg shadow-md w-96`}>
        <h2 className={`${styles.title} text-2xl font-bold text-center mb-4`}>Login</h2>
        {localError && <p className={`${styles.errorText} text-red-500 text-sm text-center`}>{localError}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.loginForm} space-y-4`}>
          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`${styles.inputField} w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder=" "
              />
              <label className={styles.label}>Email</label>
            </div>
            {errors.email && <p className={styles.invalidFeedback}>{errors.email.message}</p>}
          </div>

         <div className={styles.formGroup}>
            <div className={styles.inputBox} style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className={`${styles.inputField} w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder=" "
              />
              <label className={styles.label}>Password</label>
              <span 
                onClick={() => setShowPassword(prev => !prev)}
                className={styles.passwordViewHide}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className={styles.invalidFeedback}>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} global-button`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            onClick={() => setIsEmailModalOpen(true)} 
            className={`${styles.signupText} text-blue-500 hover:underline`}
          >
            Forgot your password? Click here.
          </button>
        </div>
      </div>
      {isEmailModalOpen && (
        <EmailModal
          onClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleForgotPasswordSubmit}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Login;
