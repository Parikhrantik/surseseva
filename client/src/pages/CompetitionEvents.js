/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import useCompetitionMangementAuth from "../hooks/useCompetitionMangementAuth";
import { Link, useNavigate } from "react-router-dom";
import RegistrationModal from "../components/forms/RegistrationModal";
import { format } from "date-fns";
import { toast } from "react-toastify";
import VoterModal from "./modal/VoterModal";
import useCompetitionAuth from "../hooks/useCompetionAuth";
import Spinner from "../components/common/Spinner";
import ContentCard from "./ContentCard";
import {
  CircleCheckBig,
  MessageSquare,
  Bookmark,
  Play,
  MicVocal,
  Users,
  Pencil,
} from "lucide-react";

const CompetitionEvents = () => {
  const { competitions, isLoading, error } = useCompetitionMangementAuth();
  console.log(competitions, "competitionscompetitionscompetitionscompetitions");
  const { Performances, fetchCompetitionsandPerformances } =
    useCompetitionAuth();
  console.log(Performances, "PerformancesPerformancesPerformances1111111");
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
  // new

  const handleFeedbackSubmit = (data) => {
    console.log("Feedback submitted:", data);
  };
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  let toastId = null;

  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const handleCompetitionClick = (competition) => {
    if (selectedCompetition === competition._id) {
      setSelectedCompetition(null); // Deselect if already selected
    } else {
      setSelectedCompetition(competition._id);
    }
  };

  const handleVoterClick = (competitionId) => {
    setSelectedCompetition(
      selectedCompetition === competitionId ? null : competitionId
    );
  };

  const openRegistrationModal = (competitionId, startDate, endDate, userId) => {
    setSelectedCompetitionId(competitionId);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setSelectedParticipantId(userId);
    setIsRegistrationOpen(true);
  };

  const handleParticipateClick = (
    competitionId,
    startDate,
    endDate,
    userId
  ) => {
    const token = localStorage.getItem("authToken");
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
    openvoterModal(competitionId, userId);
  };

  const startRedirectCountdown = () => {
    let countdown = 3;
    // Show the initial toast with no autoClose
    toastId = toast.error(
      `You need to login first! Redirecting to Login Page in ${countdown}...`,
      {
        autoClose: false, // Don't close the toast automatically
      }
    );
    const intervalId = setInterval(() => {
      if (countdown === 0) {
        clearInterval(intervalId);
        navigate("/login"); // Redirect to login page
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
  console.log("performanceEvents111", performanceEvents);
  const competitionEvents = Performances.data?.competitionEvents || [];
  console.log("competitionEvents1111", competitionEvents);

  // partcipenet count
  const participantCounts = competitionEvents.reduce((acc, event) => {
    const competitionId = event.competitionId;

    if (!acc[competitionId]) {
      acc[competitionId] = new Set(); // Use Set to store unique participants
    }

    acc[competitionId].add(event.userId._id); // Add participant ID to the Set

    return acc;
  }, {});
  //  Convert to a readable format
  const competitionParticipants = Object.entries(participantCounts).map(
    ([competitionId, participants]) => ({
      competitionId,
      participantCount: participants.size,
    })
  );


  const handleVoteButtonClick = (competition_Id, selectedParticipantId) => {
    const loggedInUserId = localStorage.getItem("userId");
    const participantId = selectedParticipantId;

    if (!loggedInUserId) {
      startRedirectCountdown();
      return;
    }

    const userHasVoted = competitionEvents.some(
      (event) =>
        event.competitionId === competition_Id &&
        event.loggedInUserId === loggedInUserId
    );
    if (userHasVoted) {
      const voteButton = document.getElementById(
        `vote-button-${competition_Id}`
      );
      if (voteButton) {
        voteButton.style.backgroundColor = "green";
      }
      setHasVoted(true);
      return;
    }
    openvoterModal(competition_Id, participantId);
  };

  const handleViewAllClick = () => {
    navigate("/singer-auditions");
    setShowAll(!showAll);
  };

  const eventsToDisplay = showAll
    ? performanceEvents
    : performanceEvents.slice(0, 4);
  const competitionToDisplay = showAll
    ? competitionEvents
    : competitionEvents.slice(0, 4);

  const VideoPlayer = ({ performanceFile, videoLink }) => {
    const getYoutubeEmbedUrl = (url) => {
      if (!url) return null;
      try {
        if (url.includes("youtube.com/watch?v=")) {
          return `https://www.youtube.com/embed/${
            url.split("v=")[1].split("&")[0]
          }`;
        } else if (url.includes("youtu.be/")) {
          return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
        }
        return null;
      } catch (error) {
        console.error("Error parsing YouTube URL:", error);
        return null;
      }
    };

    if (performanceFile && performanceFile !== "null") {
      return (
        <video width="100%" height="200" controls className="rounded-lg">
          <source src={performanceFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (videoLink) {
      const embedUrl = getYoutubeEmbedUrl(videoLink);
      if (embedUrl) {
        return (
          <iframe
            width="100%"
            height="200"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        );
      }
    }

    return (
      <div className="flex items-center justify-center h-full bg-gray-700 rounded-lg">
        <p className="text-gray-300">No video available</p>
      </div>
    );
  };

  const handleViewAllClick1 = () => {
    navigate("/present-competition");
    setShowAll(!showAll);
  };

  const handleClickDetailsParticipant = (competitionId) => {
    navigate(`/singer-auditions-details/${competitionId}`);
  };

  return (
    <>
      <div className="py-20 bg-black" id="competition-section">
        <div className="container mx-auto px-4">
          {role === "Participant" && (
            <>
              <div className="mb-16">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-sm mb-4">
                  <Star className="h-4 w-4 inline mr-2 text-yellow-400" />
                  Hot & Trending
                </span>
                <h3 className="text-4xl font-bold">Present Competition</h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                  {competitions.data?.length > 3 && (
                    <button
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleViewAllClick1}
                    >
                      View All <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.isArray(competitions?.data) &&
                competitions.data.length > 0 ? (
                  competitions.data
                    .filter(
                      (competition) =>
                        new Date(competition.endDate) >= new Date()
                    )
                    .slice(0, 4) // Limit to 4 competitions
                    .map((competition) => (
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

                        <Link
                          to={`/competition-events-details/${competition._id}`}
                        >
                          <h3 className="text-lg font-semibold mb-3">
                            {competition.name.length > 28
                              ? `${competition.name.slice(0, 28)}...`
                              : competition.name}
                          </h3>
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
                              {
                                competition.endDate && competition.endDate
                                  ? format(
                                      new Date(competition.endDate),
                                      "dd-MM-yyyy"
                                    )
                                  : "N/A" // Fallback text if the date is invalid or missing
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <button className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/60 hover:bg-purple-500/20 transition-colors">
                        Share
                      </button> */}
                            <button
                              className="px-2 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25"
                              // onClick={() => openRegistrationModal(competition._id, competition.startDate, competition.endDate)}
                              onClick={() =>
                                handleParticipateClick(
                                  competition._id,
                                  competition.startDate,
                                  competition.endDate
                                )
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
                    <p className="text-white/60 text-sm">
                      No competitions found.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          {/* 
         {(role !== "Participant") && (
            <>
              <div className="mb-16">
                <h3 className="text-4xl font-bold">Singer Auditions</h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                  {(performanceEvents.length > 3) && (
                    <button
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleViewAllClick}
                    >
                      View All <ArrowRight className="h-4 w-4" />
                    </button>
                  )}

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {performanceEvents.length > 0 ? (
                  eventsToDisplay.map((event, index) => {
                    const correspondingCompetitionEvent = competitionEvents.find(
                      (compEvent) => compEvent._id === event.competitionRegId
                    );

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

                            
                            <VideoPlayer
                              performanceFile={event.performanceFile}
                              videoLink={event.videoLink}
                            />
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
                              {role !== "judge" && (
                                <div className="flex items-center gap-2">
                                  <button
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                                    onClick={() => handleVoteButtonClick(event.competitionRegId, event.userId)}
                                    disabled={hasVoted}
                                  >
                                    {hasVoted ? 'Voted' : 'Vote'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white/60 text-center col-span-4">
                    <Spinner />
                  </p>
                )}
              </div>
            </>

          )} */}

          {role !== "Participant" && (
            <>
              <div className="mb-16">
                <h3 className="text-4xl font-bold">Singer Auditions</h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                  {competitionToDisplay.length > 3 && (
                    <button
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleViewAllClick}
                    >
                      View All <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.isArray(competitionEvents) &&
                competitionEvents?.length > 0 ? (
                  competitionEvents.slice(0, 4).map((event) => {
                    // console.log("eveeeeeee",event)
                    // Find the participant count for this event
                    const participantData = competitionParticipants.find(
                      (comp) => comp.competitionId === event.competitionId
                    );
                    const participantCount = participantData
                      ? participantData.participantCount
                      : 0;
                    return (
                      <div
                        key={event._id}
                        className="invition-card group bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:border-purple-600 transform hover:scale-105 hover:translate-y-4 transition-all duration-300 shadow-lg shadow-purple-500/25"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className="d-flex align-items-center"
                            style={{ display: "flex" }}
                          >
                            <MicVocal className="me-2" /> {event.category}
                          </div>
                        </div>

                        <h3
                          className="text-2xl font-semibold mb-3 text-white hover:text-gradient-to-r from-purple-500 to-pink-500"
                          onClick={() =>
                            // handleClickDetailsParticipant(event.userId._id)
                            handleClickDetailsParticipant(event.competitionId)
                          }
                        >
                          {event.competitionName.length > 28
                            ? `${event.competitionName.slice(0, 28)}...`
                            : event.competitionName}
                        </h3>

                        <p className="text-white/60 text-sm mb-4">
                          {event.description?.length > 245 ? (
                            <span>{event.description.slice(0, 245)}...</span>
                          ) : (
                            event.description
                          )}
                        </p>

                        <div className="invition-date pt-4 border-t border-white/20 flex items-center justify-between text-sm text-white/70">
                          <div className="flex space-x-6">
                            <button className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-500">
                                Votes: {event.totalVotes}
                              </span>
                            </button>
                            <button className="flex items-center space-x-2">
                              <Pencil className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-500">
                              Participants: {participantCount}
                              </span>
                            </button>
                          </div>
                          {/* <button
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                            onClick={() => handleVoterClick(event._id)}
                          >
                            Votes
                          </button> */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white/60 text-center col-span-4">
                    <Spinner />
                  </p>
                )}
              </div>
            </>
          )}

          {/* {role !== "Participant" && (
            <>
              <div className="mb-16">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-sm mb-4">
                  <Star className="h-4 w-4 inline mr-2 text-yellow-400" />
                  Hot & Trending
                </span>
                <h3 className="text-4xl font-bold">
                Singer Auditions1
                </h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                  {competitions.data?.length > 3 && (
                    <button
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleViewAllClick1}
                    >
                      View All <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.isArray(competitions?.data) &&
                competitions.data.length > 0 ? (
                  competitions.data
                    .filter(
                      (competition) =>
                        new Date(competition.endDate) >= new Date()
                    )
                    .slice(0, 4) 
                    .map((competition, index) => (
                      <div key={competition._id}>
                        <div className="invition-card group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                                {index + 1}
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

                          <Link
                            to="#"
                            onClick={() => handleCompetitionClick(competition)}
                          >
                            <h3 className="text-lg font-semibold mb-3">
                              {competition.name.length > 28
                                ? `${competition.name.slice(0, 28)}...`
                                : competition.name}
                            </h3>
                          </Link>

                          <p className="text-white/60 text-sm mb-4">
                            {competition.description.length > 245 ? (
                              <span>
                                {competition.description.slice(0, 245)}...
                              </span>
                            ) : (
                              competition.description
                            )}
                          </p>

                          <div className="invition-date pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center">
                                <span>Last Date: </span>
                                {competition.endDate
                                  ? format(
                                      new Date(competition.endDate),
                                      "dd-MM-yyyy"
                                    )
                                  : "N/A"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25"
                                onClick={() =>
                                  handleParticipateClick(
                                    competition._id,
                                    competition.startDate,
                                    competition.endDate
                                  )
                                }
                              >
                                Participate
                              </button>
                            </div>
                          </div>
                        </div>

                        {selectedCompetition === competition._id && (
                          <div className="mt-4">
                            <h4 className="text-md font-bold">Participants:</h4>
                            {Array.isArray(competitionEvents) &&
                            competitionEvents.length > 0 ? (
                              competitionEvents
                                .filter(
                                  (event) =>
                                    event.competitionId === selectedCompetition
                                )
                                .map((event) => (
                                  <p
                                    key={event._id}
                                    className="text-sm text-gray-400"
                                  >
                                    {event.userId?.name ||
                                      "Unknown Participant"}
                                  </p>
                                ))
                            ) : (
                              <p className="text-sm text-gray-400">
                                No participants found.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="col-span-full text-center">
                    <p className="text-white/60 text-sm">
                      No competitions found.
                    </p>
                  </div>
                )}
              </div>
            </>
          )} */}
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
