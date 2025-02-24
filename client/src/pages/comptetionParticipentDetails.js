import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCompetitionMangementAuth from "../hooks/useCompetitionMangementAuth";
import useCompetitionAuth from "../hooks/useCompetionAuth";
import Spinner from "../components/common/Spinner";
import { CircleCheckBig, MessageSquare, MicVocal, Users } from "lucide-react";
import { toast } from "react-toastify";
import RegistrationModal from "../components/forms/RegistrationModal";
import VoterModal from "./modal/VoterModal";

const CompetitionParticipantDetails = () => {
  const { competitionId } = useParams();
  const { competitions, isLoading, error } = useCompetitionMangementAuth();
  const { Performances, getApprovedParticipantCompitions } =
    useCompetitionAuth();
  // console.log("Competition ID:", competitionId);

  // console.log("Performancesiiiiii", Performances);
  // console.log("API Performances:", Performances?.data?.performanceEvents);

  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competitionEvents, setCompetitionEvents] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [competitionPerformances, setCompetitionPerformances] = useState([]);
  const loggedInUserId = localStorage.getItem("userId");
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selected_CompetitionId, setSelected_CompetitionId] = useState(null);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  let toastId = null;
  console.log(competitionPerformances, "competitionPerformances");

  const performanceEvent = Performances.data?.performanceEvents || [];
  const competitionEventes = Performances.data?.
  competitionEvents || [];
  // console.log("performanceEvents111111", performanceEvents.filter(ele=>ele.userId===competitionId));

  // const filteredPerformanceEvents = performanceEvent.filter(
  //   (ele) => ele.userId === competitionId
  // );
  const competitionParticipantCounts = competitionEventes.reduce((acc, event) => {
    if (!acc[event.competitionId]) {
      acc[event.competitionId] = new Set(); // Use Set to store unique participants
    }
    acc[event.competitionId].add(event.userId._id); // Store unique participant IDs
    return acc;
  }, {});
  
  // Convert to an array for easy access
  const competitionParticipants = Object.entries(competitionParticipantCounts).map(
    ([competitionId, participants]) => ({
      competitionId,
      participantCount: participants.size, // Get the count of unique participants
    })
  );
  
  console.log(competitionParticipants, "competitionParticipants");

  const filteredPerformanceEvents = performanceEvent.filter(
    (ele) => ele.competitionId === competitionId
  );
  console.log(competitionEventes, "2222222222");

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

  // Filter performances for this competition

  // const fetchPerfomanceResponse = async () => {
  //   try {
  //     if (!Performances || !Performances.data || !Array.isArray(Performances.data.performanceEvents)) {
  //       throw new Error("Invalid Performances data structure");
  //     }

  //     if (!competitionId) {
  //       throw new Error("competitionId is required");
  //     }

  //     const perfomanceRes = Performances.data.performanceEvents;
  //     const filteredPerformances = perfomanceRes.filter(
  //       (ele) => ele.competitionRegId === competitionId
  //     );

  //     setCompetitionPerformances(filteredPerformances);
  //   } catch (error) {
  //     console.error("Error fetching competition performances:", error.message);
  //   }
  // }

  const fetchPerformanceData = async () => {
    try {
      if (!Performances?.data?.performanceEvents || !competitionId) {
        throw new Error(
          "Invalid Performances data structure or missing competition ID"
        );
      }

      // Filtering performances by competition ID
      const filteredPerformances = Performances.data.performanceEvents.filter(
        (event) => event.competitionRegId === competitionId
      );

      setCompetitionPerformances(filteredPerformances);
    } catch (error) {
      console.error("Error fetching competition performances:", error.message);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, [Performances, competitionId]);
  // const fetchPerfomanceResponse = async () => {
  //   try {
  //     if (!Performances?.data?.performanceEvents || !Array.isArray(Performances.data.performanceEvents)) {
  //       throw new Error("Invalid Performances data structure");
  //     }

  //     if (!competitionId) {
  //       throw new Error("competitionId is required");
  //     }

  //     const perfomanceRes = Performances.data.performanceEvents;
  //     const filteredPerformances = perfomanceRes.filter(
  //       (ele) => ele.competitionRegId === competitionId
  //     );

  //     setCompetitionPerformances(filteredPerformances);
  //   } catch (error) {
  //     console.error("Error fetching competition performances:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchPerfomanceResponse();
  // }, [Performances, competitionId]);

  // Memoize API call to prevent unnecessary function recreation
  // const fetchCompetitionData = useCallback(async () => {
  //   if (competitionId && !hasFetched) {
  //     console.log("Fetching approved participant competitions...");
  //     await getApprovedParticipantCompitions(competitionId);
  //     setHasFetched(true);
  //   }
  // }, [competitionId, hasFetched, getApprovedParticipantCompitions]);

  // useEffect(() => {
  //   fetchCompetitionData();
  //   // fetchPerfomanceResponse()
  // }, [fetchCompetitionData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!competitionId || !competitions?.data) return;

        const foundCompetition = competitions.data.find(
          (comp) => comp._id === competitionId
        );

        if (foundCompetition) {
          setSelectedCompetition(foundCompetition);

          // Check both possible data structures
          const eventsArray =
            Performances?.data?.competitionEvents ||
            Performances?.data?.performanceEvents;

          console.log("Events Array from API:", eventsArray);

          if (Array.isArray(eventsArray) && eventsArray.length > 0) {
            // Filter events that match the competition ID
            const relatedEvents = eventsArray.filter(
              (event) => event.competitionId === competitionId
            );

            console.log("Filtered Events for this competition:", relatedEvents);

            if (relatedEvents.length > 0) {
              setCompetitionEvents(relatedEvents);
            } else {
              setCompetitionEvents([]);
            }
          } else {
            console.log("No events array found in API response");
            setCompetitionEvents([]);
          }
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if Performances has changed
    if (Performances && Object.keys(Performances).length > 0) {
      fetchData();
    }
  }, [competitions, competitionId, Performances]);

  // const performanceEvents = Performances.data?.performanceEvents || [];
  // console.log("performanceEvents1111222", performanceEvents);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error fetching competition details.</p>;
  }

  // Debug what's available
  console.log("Current state - selectedCompetition:", selectedCompetition);
  console.log("Current state - competitionEvents:", competitionEvents);

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

  const handleVoteButtonClick = (competition_Id, selectedParticipantId) => {
    debugger
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

  const handleFeedbackSubmit = (data) => {
    console.log("Feedback submitted:", data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="py-20 bg-gradient-to-b from-black to-purple-900/20 w-full">
          <div className="container mx-auto px-4">
            <div className="p-6 bg-gray-900 text-white min-h-screen">
              {/* {selectedCompetition ? (
                <>
                  <h1 className="text-3xl font-bold text-center mb-10">
                    {selectedCompetition.name}
                  </h1> */}

              {/* Competition Events Section with explicit check for empty array */}
              {/* {Array.isArray(competitionEvents) && competitionEvents.length > 0 ? (
                    <div className="mt-6">
                      <h2 className="text-2xl font-semibold text-center mb-6">
                        Participant Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {competitionEvents.map((event) => (
                          <div
                            key={event._id || `event-${Math.random()}`}
                            className="bg-gradient-to-br from-gray-800 to-gray-700 backdrop-blur-lg rounded-3xl p-6 border border-gray-600 hover:border-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                <p className="font-semibold text-xl text-white">
                                  {event?.userId?.name || "Unknown Participant"}
                                </p>
                              </div>
                              {event?.userId?.profilePicture ? (
                                <img
                                  src={event.userId.profilePicture}
                                  alt={event.userId.name || "Participant"}
                                  className="w-16 h-16 rounded-full border-2 border-white"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/64";
                                  }}
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                                  <span className="text-xl text-white">
                                    {(event?.userId?.name || "U")[0].toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-white text-sm mb-4">
                              {event?.userId?.email || "No email provided"}
                            </p>
                            
                            <div className="mt-4 pt-4 border-t border-white/20">
                              <p className="text-gray-300 text-sm">
                                Status: <span className="text-green-400 font-medium">Approved</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-12">
                      <div className="text-purple-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-center text-white/60 text-lg">
                        No participants found for this competition.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-center text-white/60 text-lg">
                    Competition not found.
                  </p>
                </div>
              )} */}

              <div className="mb-16">
                <h3 className="text-4xl font-bold">Singer Auditions </h3>
                <div className="main-title-sec flex justify-between items-center">
                  <div></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPerformanceEvents.length > 0 ? (
                  filteredPerformanceEvents?.map((event, index) => {
                    const correspondingCompetitionEvent = competitionEventes?.find(
                      (compEvent) => compEvent._id === event.competitionRegId
                    );
                    const totalVotes = correspondingCompetitionEvent?.totalVotes || 0;
                    const feedbackCount = correspondingCompetitionEvent?.feedbackCount || 0;
                    const userName = correspondingCompetitionEvent?.userId?.name || "";
                    const profilePicture =
                      correspondingCompetitionEvent?.userId?.profilePicture ||
                      "/images/default-avatar.png";
                    const hasVoted = correspondingCompetitionEvent?.voters?.includes(
                      loggedInUserId
                    );
                    const participantCount =
                    competitionParticipants.find(
                      (comp) => comp.competitionId === event.competitionId
                    )?.participantCount || 0;
                
                    console.log("Event Details:", event);

                    return (
                      <div
                        key={event._id}
                        className="invition-card group bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:border-purple-600 transform hover:scale-105 hover:translate-y-4 transition-all duration-300 shadow-lg shadow-purple-500/25"
                      >
                        <div className="flex items-center justify-between mb-6"></div>
                        <div className="hover:text-purple-600 transition-colors duration-300">
                          <h3 className="text-2xl font-semibold mb-3 text-white hover:text-gradient-to-r from-purple-500 to-pink-500">
                            <div className="flex justify-between">
                              <div
                                className="d-flex align-items-center"
                                style={{ display: "flex" }}
                              >
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
                            {event.performanceTitle || "Competition"}
                          </h3>
                        </div>

                        <VideoPlayer
                          performanceFile={event.performanceFile}
                          videoLink={event.videoLink}
                        />

                        <div className="invition-date pt-4 border-t border-white/20 flex items-center justify-between text-sm text-white/70">
                          <div className="flex space-x-6">
                            <button className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-500">
                            {totalVotes || 0}
                              
                              </span>
                            </button>
                            <button className="flex items-center space-x-2">
                              <MessageSquare className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-500">
                              {feedbackCount || 0}
                              </span>
                            </button>
                          </div>

                          {role !== "judge" && (
                            <div className="flex items-center gap-2">
                              <button
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                                onClick={() =>
                                  handleVoteButtonClick(
                                    event.competitionRegId,
                                    event.userId
                                  )
                                }
                                disabled={event.hasVoted}
                              >
                                {event.hasVoted ? "Voted" : "Vote"}
                              </button>
                            </div>
                          )}
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

              {/* {competitionPerformances.length > 0 ? (
                competitionPerformances.map((performance) => (
                  <div
                    key={performance._id}
                    className="p-4 bg-gray-800 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-purple-400">
                      {performance.performanceTitle}
                    </h3>
                    <p className="text-gray-300">{performance.description}</p>
                    <audio
                      controls
                      src={performance.performanceFile}
                      className="mt-2 w-full"
                    ></audio>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No performances found for this competition.
                </p>
              )} */}
            </div>
          </div>
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
    </div>
  );
};

export default CompetitionParticipantDetails;
