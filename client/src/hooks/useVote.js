import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_BASE_URL || 'http://34.122.208.248/node';

const useVote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const apiCall = async (url, data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const successMessage = response.data.message || 'Feedback submitted successfully';
        setSuccess(successMessage);
        toast.success(successMessage);
        window.location.reload();
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred while submitting feedback';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const voterFeedback = async (feedbackData) => {
    // singer-auditions
    return await apiCall(`${API_URL}/vote/vote`, feedbackData);
  };

  return { voterFeedback, isLoading, error, success };
};

export default useVote;
