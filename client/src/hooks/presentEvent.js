// src/hooks/useEventApi.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// const API_URL = process.env.BASE_URL || 'http://localhost:5000';
const API_URL = process.env.BASE_URL || 'http://35.208.79.246/node';

const usePresentEventApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  const apiCall = async (url, data = null, method = 'GET') => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${API_URL}${url}`,
        method,
        data,
        headers: { 'Content-Type': 'application/json' },
      });

    //   toast.success(response.data.message || 'Success!');
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong!';
    //   toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (data) => {
    return await apiCall('/events/create', data, 'POST');
  };

  const getAllEvents = async () => {
    const response = await apiCall('/events/getallevents');
    setEvents(response.data || []);
    return response.data;
  };

  const getEventById = async (id) => {
    const response = await apiCall(`/events/${id}`);
    setEventDetails(response.data || null);
    return response.data;
  };

  return { createEvent, getAllEvents, getEventById, isLoading, events, eventDetails };
};

export default usePresentEventApi;
