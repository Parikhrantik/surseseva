import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Role, AuthToken } from '../utils/constants';

// const API_URL = process.env.LIVE_BASE_URL || 'http://localhost:5000';
const API_URL = process.env.BASE_URL || 'http://34.122.208.248/node'


const useParticipantsAuth = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState({});
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  // Fetch all participants
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': `Bearer ${AuthToken}` || localStorage.getItem('authToken'),
      'role': Role || localStorage.getItem('role')
    },
  };
  useEffect(() => {
    const fetchParticipants = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_URL}/user/getAllUserDetails`, config);
          setParticipants(response.data);
        } catch (error) {
          toast.error('Error fetching participants data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchParticipants();
  }, [id]);

  // Fetch participant by ID
  useEffect(() => {
    const fetchParticipant = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_URL}/user/getUserById/${id}`, config);
          setParticipant(response.data);
        } catch (error) {
          toast.error('Error fetching participant data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchParticipant();
  }, [id]);

  // Handle participant delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/user/deleteUser/${id}`, config);
      toast.success('User deleted successfully');
      window.location.reload();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };


  const updateUser = async (id, userData) => {
    setLoading(true);
    const formData = new FormData();

    try {
      // Append each key to FormData
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'genrePreferences' && Array.isArray(value)) {
          value.forEach((genre) => formData.append('genrePreferences[]', genre));
        } else if (value instanceof File) {
          formData.append(key, value); // Handle file uploads (e.g., profilePicture)
        } else if (value) {
          formData.append(key, value); // Other fields
        }
      });

      // API call
      const response = await axios.put(`${API_URL}/user/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${AuthToken}` || localStorage.getItem('authToken'),
          'role': Role || localStorage.getItem('role')
        },
      });

      // toast.success('Profile updated successfully!');
      // window.location.reload();
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred while updating the profile.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { participants, loading, handleDelete, participant, setId, updateUser };
};

export default useParticipantsAuth;
