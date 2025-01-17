import React, { useState, useEffect } from 'react';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const MyCompetitions = () => {
  const { setId, loading, userEvents } = useCompetitionAuth();
  const userId = localStorage.getItem('userId');
//   const API_URL = process.env.BASE_URL || 'http://localhost:5000';
  const API_URL = process.env.BASE_URL || 'http://35.208.79.246/node';
    const navigate = useNavigate();
  useEffect(() => {
    if (setId) {
      setId(userId);
    }
  }, [userId, setId]);

  // Extracting competitionEvents
  const competitionEvents = userEvents?.competitionEvents || [];

  const handleDelete = (eventId) => {
    const userId = localStorage.getItem('userId');
    const data = { userId, eventId };

    fetch(`${API_URL}/competition/delete-competition-registration`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Event deleted successfully');
          navigate('/events');
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error deleting event');
      });
  };
  return (
    
    <div className="py-20 bg-black pt-20">
        <div className="container mx-auto px-4">
    <div className="p-6" >
      <h1 className="text-2xl font-bold mb-6">My Competitions</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {competitionEvents.length > 0 ? (
          competitionEvents.map((competition, index) => (
            <div
              key={competition._id}
              className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <span className="text-lg text-white px-3 py-1 rounded-full capitalize">
                  {competition.category}
                </span>
              </div>

              <h3  className="text-lg text-white px-3 py-1 rounded-full capitalize">
                {competition.competitionName}
              </h3>

              {/* <p className="text-white/60 text-sm mb-4">
                Competition ID: {competition.competitionId}
              </p> */}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    Start Date - End Date
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                     
                    </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-white/60 text-sm">No competitions found.</p>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default MyCompetitions;
