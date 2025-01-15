import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useParticipantsAuth from '../../hooks/useParticipantsAuth';


const Viewuser = () => {
  const { id } = useParams();
  const { participant, setId, loading } = useParticipantsAuth();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!participant || Object.keys(participant).length === 0) {
    return <div>No participant data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Participant Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Name:</strong> {participant.name}</p>
        <p><strong>Email:</strong> {participant.email}</p>
        <p><strong>Role:</strong> {participant.role}</p>
        <p><strong>Phone:</strong> {participant.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {participant.address || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Viewuser;
