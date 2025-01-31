import React, { useState } from "react";
import AuthLayout from "../common/AuthLayout";
import Button from "../common/Button/Button";
import { toast } from "react-toastify"; // Import toast from react-toastify
import useAuth from "../../hooks/useAuth";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Use useParams for fetching the token from the URL

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation(); // Get location object to access the query string
  const token = new URLSearchParams(location.search).get("token");
  const { isLoading, error, success, resetPassword } = useAuth();
  const navigate = useNavigate(); // Optionally, navigate after password reset

  // Function to handle resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Check if password and confirm password fields are filled
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    // Validate password length (must be at least 6 characters)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check if token is present
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    try {
      const resetData = {
        token, // Pass the token from the URL
        newPassword: password, // Pass the new password
      };

      await resetPassword(resetData);
      toast.success("Password reset successfully. You can now log in.");
      navigate("/login"); 
    } catch (err) {
      console.error("Error resetting password:", err);
      toast.error(error || "Something went wrong. Please try again later.");
    }
  };

  return (
    <AuthLayout>
      <form
        className="max-w-lg w-full mx-auto"
        onSubmit={handleResetPassword}
      >
        <div className="mb-12">
          <h3 className="text-[#0a1851] md:text-3xl text-3xl font-extrabold text-center">
            Reset Password
          </h3>
        </div>
        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">New Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Confirm your new password"
            />
          </div>
        </div>

        <div className="mt-12">
          <Button
            text={isLoading ? "Resetting..." : "Reset Password"}
            style={{ width: "100%" }}
            disabled={isLoading}
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordForm;
