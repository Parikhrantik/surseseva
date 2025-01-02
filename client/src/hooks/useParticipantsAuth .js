import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.BASE_URL || 'http://localhost:5000';

const useParticipantsAuth = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getAllUserDetails`);
        setParticipants(response.data);
      } catch (error) {
        toast.error('Error fetching participants data');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return { participants, loading };
};

export default useParticipantsAuth;
