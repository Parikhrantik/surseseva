import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.BASE_URL || 'http://35.208.79.246/node';

const useParticipantsAuth = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState({});
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  // Fetch all participants
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

  // Fetch participant by ID
  useEffect(() => {
    const fetchParticipant = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_URL}/user/getUserById/${id}`);
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
      await axios.delete(`${API_URL}/user/deleteUser/${id}`);
      toast.success('User deleted successfully');
      window.location.reload();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  // Handle participant update
  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/user/updateUser/${id}`, userData);
      toast.success('User updated successfully');
      window.location.reload();
      navigate('/profile')
    } catch (error) {
      toast.error('Error updating user');
    }
  };



  return { participants, loading, handleDelete, participant, setId, handleSubmit };
};

export default useParticipantsAuth;
