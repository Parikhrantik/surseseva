import React, { useState } from 'react';

import AuthLayout from '../common/AuthLayout';
import Button from '../common/Button/Button';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Resendemail = () => {
  const [email, setEmail] = useState("");
  const { handleResendEmail, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleResendEmail(email);
    //   toast.success("Verification email resent successfully");
    } catch (error) {
        console.log(error)
    //   toast.error("Error resending verification email");
    }
  };

  return (
    <AuthLayout>
      <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
        <div className="mb-12">
          <h3 className="text-[#0a1851] text-3xl font-extrabold text-center">
            Resend Verification Email
          </h3>
        </div>

        <div className="mt-6">
          <label className="text-gray-800 text-sm block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
            required
          />
        </div>

        <div className="mt-12">
          <Button
            type="submit"
            text={isLoading ? <Spinner /> : "Resend Email"}
            style={{ width: "100%" }}
          />
        </div>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 text-sm font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Resendemail;