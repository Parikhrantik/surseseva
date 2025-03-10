import { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Role, AuthToken } from '../utils/constants';

const API_URL = process.env.REACT_APP_BASE_URL || 'http://34.122.208.248/node';
// const API_URL = process.env.LIVE_BASE_URL || 'http://localhost:5000';

// const API_URL = process.env.BASE_URL || 'http://localhost:5000';

const useCompetitionAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [competitionData, setCompetitionData] = useState([]);
  const [approvedParticipantCompitions, setApprovedParticipantCompitions] = useState([]);
  const [Performances, setPerformances] = useState([]);
  console.log(Performances,",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
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
          'Authorization': `Bearer ${AuthToken}` || localStorage.getItem('authToken'),
          'role': Role || localStorage.getItem('role')
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
       
        const response = await axios.get(`${API_URL}/competition/user-registration/${userId}`);
        // const response =  await axios.get(`${API_URL}/competition/approved-Competitons/${userId}`,config);
        setUserEvents(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching participant data:', error);
        toast.error('Error fetching participant data');
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getApprovedParticipantCompitions = async (userId) => {
    if (userId) {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${AuthToken}` || localStorage.getItem('authToken'),
            'role': Role || localStorage.getItem('role')
          },
        };
        
        const response =  await axios.get(`${API_URL}/competition/approved-Competitons/${userId}`,config);
        console.log(response,"competition/approved-Competitons")
        setApprovedParticipantCompitions(response.data?.data || []);
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
      getApprovedParticipantCompitions(id);
    }
  }, [id]);

  const competitionRegistration = async (competitionData) => {
    try {
      return await apiCall(`${API_URL}/competition/register-competition`, competitionData);

    } catch (error) {


      console.error(error);
      throw error;
    }
  };

  // Function to fetch competition details by id
  const getCompetitionDetailsId = async (competitionId) => {

    if (competitionId) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/competition/get-competition-registration/${competitionId}`);
        if (response.status === 200) {
          // 
          setCompetitionData(response.data?.data || null);
          return response.data;
        } else if (response.status === 404) {
          // 
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
    // 
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}/competition/update-competition-registration/${competitionId}`,
        data
      );
      setCompetitionData(response.data?.data || null);
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

  const fetchCompetitionsandPerformances = useCallback(async (searchName, category) => {
  
    setIsLoading(true);
    try {
      // Construct the query parameters dynamically based on the passed values
      const queryParams = new URLSearchParams();
      
      if (searchName) queryParams.append('searchName', searchName);
      if (category) queryParams.append('category', category);
  
      // Append the query parameters to the API URL
      const url = `${API_URL}/competition/approved-Competitons/?${queryParams.toString()}`;
  
      // Make the API call to fetch approved competitions
      const response = await axios.get(url);
      console.log("API Response fetchCompetitionsandPerformances:", response.data);
      // Set the response data to the performances state
      if (response.data) {
        setPerformances(response.data);
      } else {
        setError('No competitions data available.');
      }
  
    } catch (err) {
      // Enhanced error handling with detailed logging
      setError('Failed to fetch competitions');
      console.error('Error fetching competitions and performances:', err);
  
      // Optionally, you can show a more descriptive error to the user.
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error('Server Error:', err.response.data);
      } else if (err.request) {
        // Request was made but no response was received
        console.error('No response received:', err.request);
      } else {
        // Something else triggered an error
        console.error('Unexpected error:', err.message);
      }
    } finally {
      // Set loading to false once the fetch operation is complete
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchCompetitionsandPerformances();
  }, [fetchCompetitionsandPerformances]);

  return {
    competitionRegistration,
    isLoading,
    error,
    setId,
    setcompetitionId,
    success,
    userEvents,
    Performances,
    competitionData,
    updateCompetition,
    getCompetitionDetailsId,
  
    approvedParticipantCompitions,
    fetchCompetitionsandPerformances,
    getApprovedParticipantCompitions
  };
};

export default useCompetitionAuth;
