import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.LIVE_BASE_URL || 'http://localhost:5000';


const useCompetitionMangementAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [competitionData, setCompetitionData] = useState(null);

  const fetchCompetitions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/competitionMangement/get-all-competitions`);
      setCompetitions(response.data);
    } catch (err) {
      setError('Failed to fetch competitions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  const getCompetitionDetailsId = useCallback(async (id) => {
    if (id) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/competitionMangement/get-competition/${id}`);
        if (response.status === 200) {
          setCompetitionData(response.data?.data || null);
          return response.data;
        } else if (response.status === 404) {
          setError(response.data.message);
          toast.error(response.data.message);
          return null;
        } else {
          throw new Error(`Error fetching competition details: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching competition details:', error);
        toast.error('Error fetching competition details');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const apiCall = useCallback(async (url, data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(response.data.message);
        toast.success(response.data.message);
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
  }, []);

  return {
    competitions,
    getCompetitionDetailsId,
    competitionData,
    isLoading,
    error,
    success,
    apiCall,
  };
};

export default useCompetitionMangementAuth;
