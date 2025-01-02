// src/hooks/userAuth.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.BASE_URL || 'http://localhost:5000';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const apiCall = async (url, data) => {
    debugger
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(response.data.message);
        toast.success(response.data.message);

        if (url === `${API_URL}/auth/login`) {
          navigate('/dashboard');
        }

        // Navigate to login page if registration is successful
        if (url === `${API_URL}/auth/register`) {
          navigate('/login');
        }

        return response;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login API Call
  const loginUser = async (loginData) => {
    return await apiCall(`${API_URL}/auth/login`, loginData);
  };

  // Register API Call
  const registerUser = async (registerData) => {
    return await apiCall(`${API_URL}/auth/register`, registerData);
  };

  // Forgot Password API Call
 

  return {
    loginUser,
    registerUser,
    isLoading,
    error,
    success,
  };
};

export default useAuth;
