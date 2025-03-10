import React, { useState } from "react";
import AuthLayout from "../common/AuthLayout";
import Button from "../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth.js";
import Spinner from "../common/Spinner.js";
import { toast } from "react-toastify";


const RegistrationForm = () => {
  const { registerUser, isLoading } = useAuth();
  const { control, handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

  const onSubmit = async (formData) => {

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreeToTerms: formData.agreeToTerms || false,
      role: formData.role,
    };
    try {
      const response = await registerUser(registerData, formData);
      console.log(response);
      toast.success("Verification email sent successfully! Please check your email for verification!");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <AuthLayout>
      <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-12">
          <img className="h-12 mx-auto mb-10" src="/images/SurBlack.png" alt="Logo" />
          <h3 className="text-[#0a1851] md:text-3xl text-3xl font-extrabold text-center">
            Create an account
          </h3>
        </div>

        <div>
          <label className="text-gray-800 text-sm block mb-2">Full Name</label>
          <div className="relative flex items-center">
            <input
              {...register("name", { required: "Full name is required" })}
              type="text"
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter name"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
            </svg>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Email Address</label>
          <div className="relative flex items-center">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter email"
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
              </g>
            </svg>
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}

          </div>
        </div>

        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Password</label>
          <div className="relative flex items-center">
            <input
              {...register("password", { required: "Password is required" })}
              // type="password"
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter password"
            />
            <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
            </svg>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              {...register("confirmPassword", { required: "Confirm Password is required" })}
              // type="password"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Confirm your password"
            />
            <svg   onClick={toggleConfirmPasswordVisibility} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
            </svg>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Select Role</label>
          <div className="relative flex items-center">
            <select
              {...register("role", { required: "Role selection is required" })}
              className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
            >
              <option value="">-- Select a Role --</option>
              <option value="Participant">Participant</option>
              {/* <option value="judge">judge</option> */}
              <option value="Voter">Voter</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
        </div>

        <div className="flex items-center mt-6">
          <input
            {...register("agreeToTerms", { required: "You must agree to the terms" })}
            type="checkbox"
            className="h-4 w-4 shrink-0 rounded"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
            Agree to{" "}
            <Link to="/terms-and-conditions" className="text-blue-500 font-semibold hover:underline ml-1">
              Terms and Conditions
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>}


        <div className="mt-12">
          <Button
            text={isLoading ? <Spinner /> : "Create an account"}
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
          </Button>
          <p className="text-sm mt-6 text-gray-800">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegistrationForm;
