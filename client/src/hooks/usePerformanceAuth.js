import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.BASE_URL || 'http://35.208.79.246/node';

const usePerformanceAuth = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  console.log(performanceData,"Yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  const navigate = useNavigate();
  const apiCall = async (url, data) => {
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
        // setSuccess(response.data?.message);
        toast.success(response.data?.message);
        navigate('/');
      } else {
        const errorMessage = response.data?.message || `Unexpected response status: ${response.status}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      // setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitPerformance = async (data) => {
    return await apiCall(`${API_URL}/performance/submit-performance`, data);
  };


  const getPerformanceById = async (performanceId) => {
    // debugger
    if (performanceId) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/performance/get-performance-by-id/${performanceId}`);
        if (response.status === 200) {
          // debugger
          setPerformanceData(response.data?.data || null);
          return response.data;
        } else if (response.status === 404) {
          // debugger
          setError(response.data.message);
          toast.error(response.data.message);
          return null;
        } else {
          throw new Error(`Error fetching Performance details: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching Performance details:', error);
        toast.error('Error fetching Performance details');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updatePerformance = async (performanceId, data) => {
    debugger
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}/performance/update-performance/${performanceId}`,
        data
      );
      setPerformanceData(response.data?.data || null);
      return response.data;
    } catch (error) {
      console.error('Error updating Performance:', error);
      toast.error('Error updating Performance');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitPerformance,
    isLoading,
    error,
    success,
    performanceData,
    loading,
    updatePerformance,
    getPerformanceById,
  };
}

export default usePerformanceAuth
