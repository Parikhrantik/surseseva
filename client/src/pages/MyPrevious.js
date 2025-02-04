import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import useCompetitionAuth from "../hooks/useCompetionAuth";
import {  Trash } from 'lucide-react';
import { toast } from 'react-toastify';
const MyPrevious = () => {
    const { setId, loading, userEvents } = useCompetitionAuth();
    const userId = localStorage.getItem("userId");
    const API_URL = process.env.BASE_URL || 'http://34.122.208.248/node';
    const navigate = useNavigate();
    useEffect(() => {
        if (setId && userId) {
            setId(userId);
        }
    }, [userId, setId]);

    const [pastCompetitions, setPastCompetitions] = useState([]);
    useEffect(() => {
        if (userEvents && Array.isArray(userEvents.competitionEvents)) {
            const filteredCompetitions = userEvents.competitionEvents.filter((competition) => {
                const competitionEndDate = new Date(competition.competitionendDate);
                const currentDate = new Date();
                console.log(
                    `Comparing competition date: ${competitionEndDate} with current date: ${currentDate}`
                );
                return competitionEndDate < currentDate;
            });
            setPastCompetitions(filteredCompetitions);
        } else {
            console.error("competitionEvents is not an array or missing:", userEvents);
        }
    }, [userEvents]);

  const handleDelete = (competitionId) => {
    const userId = localStorage.getItem('userId');
    const data = { userId, competitionId };
    // singer-auditions
    fetch(`${API_URL}/competition/delete-competition-registration`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Event deleted');
          navigate('/my-competitions');
          window.location.reload();
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
        <div className="my-competition-sec py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="mb-16 space-y-4">
                    <div>
                        <h3 className="text-4xl font-bold text-white">My Past Competitions</h3>
                        <p className="text-white mt-2">Your past events and participation details</p>
                    </div>
                </div>

                <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastCompetitions.length > 0 ? (
                        pastCompetitions.map((competition, index) => (
                            <div
                                key={competition._id}
                                className="group invition-card bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <span className="text-xs bg-red-500/30 text-red-600 px-3 py-1 rounded-full font-semibold">
                                    Ended
                                </span>
                                <div className="flex items-center justify-end space-x-2">
                  <div className="edit-option">
                   
                    <button
                      onClick={() => handleDelete(competition._id)}
                      className="p-1 bg-white rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>

                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg text-white">{competition.competitionName}</h3>
                                    <span className="text-sm text-white/60">
                                        {format(new Date(competition.competitionendDate), "MMMM do yyyy")}
                                    </span>
                                </div>

                                <p className="text-sm text-white/60">Category: {competition.category}</p>
                                <p className="text-sm text-white/60">Total Votes: {competition.totalVotes}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-white">
                                            Ended: {format(new Date(competition.competitionendDate), "MMMM do yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <p className="text-white/60 text-sm">No past competitions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPrevious;
