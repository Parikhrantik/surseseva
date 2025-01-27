import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the base API URL
// const API_URL = process.env.BASE_URL || 'http://localhost:5000'; // Replace with your actual API URL
const API_URL = process.env.REACT_APP_BASE_URL || 'http://34.122.208.248/node'

const useContactSupport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  const apiCall = async (url, data = null, method = 'POST') => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${API_URL}${url}`,
        method,
        data,
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.message || 'Request submitted successfully!');
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong! Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitTicket = async (data) => {
    const response = await apiCall('/contact/submit-ticket', data, 'POST');
    // console.log(response)
    setTicketDetails(response || null);
    return response;
  };

  return { submitTicket, isLoading, ticketDetails };
};

export default useContactSupport;
