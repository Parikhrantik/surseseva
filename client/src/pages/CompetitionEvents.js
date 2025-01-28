import React, { useState } from 'react';
import { Calendar, Star } from 'lucide-react';
import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationModal from '../components/forms/RegistrationModal';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const CompetitionEvents = () => {
  const { competitions, isLoading, error } = useCompetitionMangementAuth();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();
  let toastId = null;

    const openRegistrationModal = (competitionId, startDate, endDate) => {
      setSelectedCompetitionId(competitionId);
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
      setIsRegistrationOpen(true);
    };

    const handleParticipateClick = (competitionId, startDate, endDate) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        // User is logged in, show registration modal
        openRegistrationModal(competitionId, startDate, endDate);
      } else {
        startRedirectCountdown();
      }
    };

    const startRedirectCountdown = () => {
      let countdown = 3;
      // Show the initial toast with no autoClose
      toastId = toast.error(`You need to login first! Redirecting to Login Page in ${countdown}...`, {
        autoClose: false, // Don't close the toast automatically
      });
      const intervalId = setInterval(() => {
        if (countdown === 0) {
          clearInterval(intervalId);
          navigate('/login'); // Redirect to login page
          toast.dismiss(toastId); // Dismiss the toast before redirect
        } else {
          // Update the existing toast message with the countdown
          toast.update(toastId, {
            render: `You need to login first! Redirecting to Login Page in ${countdown}...`,
            autoClose: false, // Keep the toast open
          });
          countdown--;
        }
      }, 1000);
    };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="py-20 bg-black" id='competition-section'>
        <div className="container mx-auto px-4">
          <div className=" mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-sm mb-4">
              <Star className="h-4 w-4 inline mr-2 text-yellow-400" />
              Hot & Trending
            </span>
            <h3 className="text-4xl font-bold">Present Competition</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(competitions?.data) && competitions.data.length > 0 ? (
              competitions.data.map((competition) => (
                <div
                  key={competition._id}
                  className="invition-card group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        {competitions.data.indexOf(competition) + 1}
                      </div>
                    </div>
                    {new Date(competition.endDate) < new Date() ? (
                      <span className="text-xs bg-red-500/10 px-3 py-1 rounded-full">
                        Closed
                      </span>
                    ) : (
                      <span className="text-xs bg-green-500/10 px-3 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <Link to={`/competition-events-details/${competition._id}`}>
                    <h3 className="text-lg font-semibold mb-3">{competition.name.length > 28 ? `${competition.name.slice(0, 28)}...` : competition.name}</h3>
                  </Link>
                  <p className="text-white/60 text-sm mb-4">
                    {competition.description.length > 245 ? (
                      <span>
                        {competition.description.slice(0, 245)}...
                        {/* <Link
                          to={`/competition-events-details/${competition._id}`}
                          className="text-purple-500 hover:underline"
                        >
                          Read more
                        </Link> */}
                      </span>
                    ) : (
                      competition.description
                    )}
                  </p>

                  <div className="invition-date pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <span className="text-sm">
                        {new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(competition.startDate))} - {new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(competition.endDate))}
                      </span> */}
                      <span className="flex items-center">
                        <span>Last Date: </span>
                        {/* <Calendar className="w-3 h-3 mr-1" /> */}
                        {competition.endDate && competition.endDate ? (
                          format(new Date(competition.endDate), 'dd-MM-yyyy')
                        ) : (
                          'N/A' // Fallback text if the date is invalid or missing
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <button className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/60 hover:bg-purple-500/20 transition-colors">
                        Share
                      </button> */}
                      <button className='px-2 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25'

                        // onClick={() => openRegistrationModal(competition._id, competition.startDate, competition.endDate)}
                        onClick={() =>
                          handleParticipateClick(competition._id, competition.startDate, competition.endDate)
                        }
                        >
                        Participate
                      </button>
                      {/* <button className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/60 hover:bg-purple-500/20 transition-colors" onClick={() => openRegistrationModal(competition._id, competition.startDate, competition.endDate)}>
                        Participate
                      </button> */}
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

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        competitionId={selectedCompetitionId}
        competitionstartDate={selectedStartDate}
        competitionendDate={selectedEndDate}
      />

    </>
  );
};

export default CompetitionEvents;
