import React, { useState } from "react";
import AuthLayout from "../common/AuthLayout";
import Button from "../common/Button/Button";
import { toast } from "react-toastify"; // Import toast from react-toastify
import useAuth from "../../hooks/useAuth";

// Make sure to import the CSS for Toastify

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { isLoading, error, success, forgotPassword } = useAuth(); // Destructure relevant fields from useAuth

  // Function to handle sending the reset password link
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email"); // Show error toast if email is empty
      return;
    }

    try {
      // Call the resetPassword function from the hook
      await forgotPassword({ email });
      toast.success("Reset link sent to your email. Check your inbox."); // Success toast
    } catch (err) {
      console.error("Error sending reset password link:", err);
      toast.error(error || "Something went wrong. Please try again later."); // Error toast
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
            Forgot Password
          </h3>
        </div>
        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Email</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path
                    d="M0 512h512V0H0Z"
                    data-original="#000000"
                  ></path>
                </clipPath>
              </defs>
              <g
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="mt-12">
          <Button
            text={isLoading ? "Sending..." : "Send Reset Link"}
            style={{ width: "100%" }}
            disabled={isLoading}
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
