import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationModal from '../components/forms/RegistrationModal';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import VoterModal from './modal/VoterModal';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import Spinner from '../components/common/Spinner';
import ContentCard from './ContentCard';
import { CircleCheckBig, MessageSquare, Bookmark, Play, MicVocal } from 'lucide-react';

const CompetitionEvents = () => {
  const { competitions, isLoading, error } = useCompetitionMangementAuth();
  console.log(competitions, "competitionscompetitionscompetitionscompetitions")
  const { Performances } = useCompetitionAuth();
  console.log(Performances, "PerformancesPerformancesPerformances")
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selected_CompetitionId, setSelected_CompetitionId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [timer, setTimer] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const loggedInUserId = localStorage.getItem("userId");
  const [hasVoted, setHasVoted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleFeedbackSubmit = (data) => {
    console.log("Feedback submitted:", data);
  };
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  let toastId = null;

  const openRegistrationModal = (competitionId, startDate, endDate, userId) => {
    setSelectedCompetitionId(competitionId);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setSelectedParticipantId(userId);
    setIsRegistrationOpen(true);
  };

  const handleParticipateClick = (competitionId, startDate, endDate, userId) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // User is logged in, show registration modal
      openRegistrationModal(competitionId, startDate, endDate, userId);
    } else {
      startRedirectCountdown();
    }
  };


  const openvoterModal = (competition_Id, userId) => {
    setSelected_CompetitionId(competition_Id);
    setSelectedParticipantId(userId);
    setIsModalOpen(true);
  };

  const handlevoteclick = (competitionId, userId) => {
    openvoterModal(competitionId, userId)
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

  const performanceEvents = Performances.data?.performanceEvents || [];
  const competitionEvents = Performances.data?.competitionEvents || [];
  console.log('competitionEvents', competitionEvents)


  const handleVoteButtonClick = (competition_Id, selectedParticipantId) => {
    // singer-auditions
    // Get the logged in user ID from localStorage
    const loggedInUserId = localStorage.getItem("userId");
    const participantId = selectedParticipantId

    // Check if the user is logged in
    if (!loggedInUserId) {
      // Show login redirect logic (same as before)
      startRedirectCountdown();
      return;
    }

    // Check if the user has already voted
    const userHasVoted = competitionEvents.some(event => event.competitionId === competition_Id && event.loggedInUserId === loggedInUserId);
    if (userHasVoted) {
      // Change the button color to green
      const voteButton = document.getElementById(`vote-button-${competition_Id}`);
      if (voteButton) {
        voteButton.style.backgroundColor = 'green';
      }
      setHasVoted(true); // Update the hasVoted state
      return;
    }

    // Open the voting modal if the user is eligible
    openvoterModal(competition_Id, participantId);
  };


  const handleViewAllClick = () => {

    navigate('/singer-auditions');
    setShowAll(!showAll);

  };



  const eventsToDisplay = showAll ? performanceEvents : performanceEvents.slice(0, 4);

  return (
    <>
      <div className="py-20 bg-black" id='competition-section'>
        <div className="container mx-auto px-4">

          {role === "Participant" && (
            <>
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
            </>
          )}

          {(role !== "Participant") && (
            <>
              <div className="mb-16">
                <h3 className="text-4xl font-bold">Singer Auditions</h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                  {(showAll && performanceEvents.length > 3) && (
                    <button
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleViewAllClick}
                    >
                      Show Fewer <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {performanceEvents.length > 0 ? (
                  eventsToDisplay.map((event, index) => {
                    // Find the corresponding competitionEvent for the current performanceEvent
                    const correspondingCompetitionEvent = competitionEvents.find(
                      (compEvent) => compEvent.competitionId === event.competitionId
                    );

                    // Get totalVotes from the corresponding competitionEvent or default to 0
                    const totalVotes = correspondingCompetitionEvent?.totalVotes || 0;
                    const feedbackCount = correspondingCompetitionEvent?.feedbackCount || 0;
                    const userName = correspondingCompetitionEvent?.userId?.name || '';
                    const profilePicture = correspondingCompetitionEvent?.userId?.profilePicture || '/images/default-avatar.png';
                    const hasVoted = correspondingCompetitionEvent?.voters?.includes(loggedInUserId); // Check if user has voted
                    console.log('hasVoted', hasVoted)
                    return (
                      <div
                        key={event._id}
                        className="invition-card group bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:border-purple-600 transform hover:scale-105 hover:translate-y-4 transition-all duration-300 shadow-lg shadow-purple-500/25"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <Spinner />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-6"></div>
                            {/* to={`/competition-events-details/${event.competitionId}`}  */}
                            <div className="hover:text-purple-600 transition-colors duration-300">
                              <h3 className="text-2xl font-semibold mb-3 text-white hover:text-gradient-to-r from-purple-500 to-pink-500">
                                <div className="flex justify-between">


                                  <div className="d-flex align-items-center" style={{ display: "flex" }}>
                                    <MicVocal className="me-2" /> {userName}
                                  </div>
                                  <div>
                                    <img
                                      src={profilePicture}
                                      alt="Profile"
                                      className="w-10 h-10 rounded-full mr-2"
                                    />
                                  </div>
                                </div>
                              </h3>
                              <h3 className="text-2sm font-semibold mb-3 text-white hover:text-gradient-to-r from-purple-500 to-pink-500">
                                {event.performanceTitle || 'Competition'}
                              </h3>
                            </div>

                            {/* <p className="text-white/80 text-sm mb-4">{event.description || 'No description available'}</p> */}

                            {/* Video Player */}
                            {event.performanceFile && (
                              <div className="mb-6">
                                <video controls className="w-full rounded-lg shadow-lg border-2 border-white/20 hover:border-purple-500 transition-all" src={event.performanceFile} />
                              </div>
                            )}

                            <div className="invition-date pt-4 border-t border-white/20 flex items-center justify-between text-sm text-white/70">
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-6">
                                  <button className="flex items-center space-x-2">
                                    <CircleCheckBig className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-500">{totalVotes}</span>
                                  </button>
                                  <button className="flex items-center space-x-2">
                                    <MessageSquare className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-500">{feedbackCount}</span>
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                                  onClick={() => handleVoteButtonClick(event.competitionRegId, event.userId)}
                                  disabled={hasVoted}
                                >
                                  {hasVoted ? 'Voted' : 'Vote'}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white/60 text-center col-span-4">
                    <Spinner />
                    {/* No competitions available. */}
                  </p>
                )}
              </div>
            </>

          )}

        </div>
      </div>



      <VoterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        competition_Id={selected_CompetitionId}
        participantId={selectedParticipantId}
      />
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
