import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.BASE_URL || 'http://localhost:5000';

const useCompetitionAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [competitionData, setCompetitionData] = useState([]);
  // console.log(competitionData,",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
  const [competitionDetails, setCompetitionDetails] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  const [id, setId] = useState(null);
  const [competitionId, setcompetitionId] = useState(null);
  // console.log(competitionId,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeejjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  const navigate = useNavigate();

  const apiCall = async (url, data, method = 'POST') => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        },
      };
      const response = await axios({
        url,
        method,
        data,
        ...config,
      });

      if (response.status === 200 || response.status === 201) {
        // setSuccess(response.data.message);
        toast.success(response.data.message);
        return response.data; // Return only necessary data
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      // setError(errorMessage);
      toast.error(errorMessage);
      throw err; // Allow the caller to handle the error further if needed
    } finally {
      setIsLoading(false);
    }
  };

  const getUserEvents = async (userId) => {
    if (userId) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/competition/user-events/${userId}`);
        setUserEvents(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching participant data:', error);
        toast.error('Error fetching participant data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getUserEvents(id);
    }
  }, [id]);

  const competitionRegistration = async (competitionData) => {
    return await apiCall(`${API_URL}/competition/register-competition`, competitionData);
  };

 // Function to fetch competition details by id
 const getCompetitionDetailsId = async (competitionId) => {
  
  if (competitionId) {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/competition/get-competition-registration/${competitionId}`);
      if (response.status === 200) {
        // debugger
        setCompetitionData(response.data?.data || null);
        return response.data;
      } else if (response.status === 404) {
        // debugger
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
};

// Function to update competition details
const updateCompetition = async (competitionId, data) => {
  debugger
  try {
    setIsLoading(true);
    const response = await axios.put(
      `${API_URL}/competition/update-competition-registration/${competitionId}`,
      data
    );
    setCompetitionData(response.data?.data || null); // Update competition data after success
    return response.data;
  } catch (error) {
    console.error('Error updating competition:', error);
    toast.error('Error updating competition');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (competitionId) {
    getCompetitionDetailsId(competitionId);
  }
}, [competitionId]);


  return {
    competitionRegistration,
    isLoading,
    error,
    setId,
    setcompetitionId,
    success,
    userEvents,
    competitionData,
    updateCompetition,
    getCompetitionDetailsId,
  };
};

export default useCompetitionAuth;
