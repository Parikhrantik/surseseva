/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import useCompetitionAuth from "../hooks/useCompetionAuth";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import {
  CircleCheckBig,
  MessageSquare,
  MicVocal,
  Pencil,
  Search,
  ThumbsUp,
  UserCheck,
  Users,
} from "lucide-react";
import VoterModal from "./modal/VoterModal";
import useCompetitionMangementAuth from "../hooks/useCompetitionMangementAuth";

const SingerOrdinations = () => {
  const [selected_CompetitionId, setSelected_CompetitionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  //   new code
  const { competitions } = useCompetitionMangementAuth();
  console.log(competitions, "competitionscompetitionscompetitionscompetitions");
  // const { Performances, fetchCompetitionsandPerformances } =useCompetitionAuth();
  // console.log(Performances, "PerformancesPerformancesPerformances");
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const navigate = useNavigate();
  let toastId = null;

  const role = localStorage.getItem("role");
  const loggedInUserId = localStorage.getItem("userId");

  const { Performances, isLoading, error } = useCompetitionAuth(
    searchTerm,
    searchCategory
  );

  useEffect(() => {
    if (searchTerm || searchCategory) {
      handleFilter();
    }
  }, [searchTerm, searchCategory, Performances]);

  // const handleFilter = () => {
  //   setIsSearching(true);
  //   const filtered = Performances.data?.performanceEvents.filter((event) => {
  //     const correspondingCompetitionEvent =
  //       Performances.data?.competitionEvents.find(
  //         (compEvent) => compEvent._id === event.competitionRegId
  //       );
  //     const userName =
  //       correspondingCompetitionEvent?.userId?.name?.toLowerCase() || "";
  //     const category =
  //       correspondingCompetitionEvent?.category?.toLowerCase() || "";
  //     const matchesName = userName.includes(searchTerm.toLowerCase());
  //     const matchesCategory =
  //       !searchCategory || category === searchCategory.toLowerCase();
  //     return matchesName && matchesCategory;
  //   });
  //   setFilteredData(filtered || []);
  // };

  const handleFilter = (term = searchTerm, category = searchCategory) => {
    setIsSearching(true);

    let filtered = [...competitionEvents];

    // Filter by search term
    if (term) {
      filtered = filtered.filter((event) => {
        const competitionName = event.competitionName?.toLowerCase() || "";
        const userName = event.userId?.name?.toLowerCase() || "";

        return (
          competitionName.includes(term.toLowerCase()) ||
          userName.includes(term.toLowerCase())
        );
      });
    }
    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (event) => event.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  const handleSearchBarClick = () => {
    setShowAllResults(true);
    setIsSearching(true);
    // setFilteredData(Performances.data?.performanceEvents || []);
    // setFilteredData(Performances.data.competitionEvents.competitionName || []);
    setFilteredData(Performances.data?.competitionEvents || []);
  };

  // const handleSearchInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   setShowAllResults(false);
  //   if (value === "") {
  //     setIsSearching(false);
  //     setFilteredData([]);
  //   }
  // };

  // const handleCategoryChange = (e) => {
  //   setSearchCategory(e.target.value);
  //   setShowAllResults(false);
  // };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    // const value = e.target.value;
    // setSearchTerm(value);
    // handleFilter(value, searchCategory);
  };

  const handleCategoryChange = (e) => {
    // setSearchCategory(e.target.value);
    const value = e.target.value;
    setSearchCategory(value);
    handleFilter(searchTerm, value);
  };
  // const handleSearch = () => {
  //   setIsSearching(true);
  //   const filtered = Performances.data?.performanceEvents.filter((event) => {
  //     const correspondingCompetitionEvent =
  //       Performances.data?.competitionEvents.find(
  //         (compEvent) => compEvent._id === event.competitionRegId
  //       );
  //     const userName =
  //       correspondingCompetitionEvent?.userId?.name?.toLowerCase() || "";
  //     const category =
  //       correspondingCompetitionEvent?.category?.toLowerCase() || "";
  //     const matchesName = userName.includes(searchTerm.toLowerCase());
  //     const matchesCategory =
  //       !searchCategory || category === searchCategory.toLowerCase();
  //     return matchesName && matchesCategory;
  //   });
  //   setFilteredData(filtered || []);
  // };
  const handleSearch = () => {
    handleFilter();
  };
  const startRedirectCountdown = () => {
    let countdown = 3;
    toastId = toast.error(
      `You need to login first! Redirecting to Login Page in ${countdown}...`,
      {
        autoClose: false,
      }
    );

    const intervalId = setInterval(() => {
      if (countdown === 0) {
        clearInterval(intervalId);
        navigate("/login");
        toast.dismiss(toastId);
      } else {
        toast.update(toastId, {
          render: `You need to login first! Redirecting to Login Page in ${countdown}...`,
          autoClose: false,
        });
        countdown--;
      }
    }, 1000);
  };

  const openvoterModal = (competition_Id, userId) => {
    setSelected_CompetitionId(competition_Id);
    setSelectedParticipantId(userId);
    setIsModalOpen(true);
  };

  const handleVoteButtonClick = (competitionId, selectedParticipantId) => {
    // singer-auditions
    // Get the logged in user ID from localStorage
    const loggedInUserId = localStorage.getItem("userId");
    const participantId = selectedParticipantId;

    // Check if the user is logged in
    if (!loggedInUserId) {
      // Show login redirect logic (same as before)
      startRedirectCountdown();
      return;
    }

    // Check if the user has already voted
    const userHasVoted = competitionEvents.some(
      (event) =>
        event.competitionId === competitionId &&
        event.loggedInUserId === loggedInUserId
    );
    if (userHasVoted) {
      // Change the button color to green
      const voteButton = document.getElementById(
        `vote-button-${competitionId}`
      );
      if (voteButton) {
        voteButton.style.backgroundColor = "green";
      }
      setHasVoted(true); // Update the hasVoted state
      return;
    }

    // Open the voting modal if the user is eligible
    openvoterModal(competitionId, participantId);
  };

  const handleFeedbackSubmit = (data) => {
    // Your feedback submission logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="bg-red-500/10 p-4 rounded-lg">Error: {error}</div>
      </div>
    );
  }

  const performanceEvents = Performances.data?.performanceEvents || [];
  const competitionEvents = Performances.data?.competitionEvents || [];
  console.log("performanceEvents",performanceEvents)

  const categories = [
    ...new Set(competitionEvents.map((event) => event.category)),
  ];
  console.log(categories, "categories");
  // const displayData =
  //   showAllResults || isSearching ? filteredData : performanceEvents;
  // const displayEvents = isSearching ? filteredData : competitionEvents;

  // console.log("displayEvents",displayEvents)
  // Compute participant counts per competition
const participantCounts = competitionEvents.reduce((acc, event) => {
  const competitionId = event.competitionId;

  if (!acc[competitionId]) {
    acc[competitionId] = new Set(); // Use Set to store unique participants
  }

  acc[competitionId].add(event.userId._id); // Add participant ID to the Set

  return acc;
}, {});

// Convert to an array format
const competitionParticipants = Object.entries(participantCounts).map(
  ([competitionId, participants]) => ({
    competitionId,
    participantCount: participants.size, // Get count of unique participants
  })
);

console.log(competitionParticipants, "competitionParticipants");

const displayEvents = (isSearching ? filteredData : competitionEvents).map(
  (event) => ({
    ...event,
    participantCount:
      competitionParticipants.find(
        (comp) => comp.competitionId === event.competitionId
      )?.participantCount || 0, // Get participant count or default to 0
  })
);

console.log("displayEvents", displayEvents);

  

  // // Remove duplicate events based on `_id`
  // const uniqueEvents = displayEvents.filter(
  //   (event, index, self) => index === self.findIndex((e) => e._id === event._id)
  // );

  // console.log(displayEvents, "displayData");

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

  //   new code get competion detaisl

  const handleCompetitionClick = (competition) => {
    if (selectedCompetition === competition._id) {
      setSelectedCompetition(null); // Deselect if already selected
    } else {
      setSelectedCompetition(competition._id);
    }
  };

  const handleClickDetailsParticipant = (competitionId) => {
    navigate(`/singer-auditions-details/${competitionId}`);
  };

  const handleVoterClick = (competitionId) => {
    setSelectedCompetition(
      selectedCompetition === competitionId ? null : competitionId
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="py-20 bg-gradient-to-b from-black to-purple-900/20 w-full">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Singer Auditions</h2>
                <p className="text-white/60">
                  Discover the most exciting experiences
                </p>
              </div>

              {/* Search and Filter Section */}
              <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by Compettion Title..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-500 rounded-lg 
                       bg-black/20 text-white focus:outline-none focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                      onClick={handleSearchBarClick}
                    />
                  </div>

                  <div className="md:w-1/3">
                    <select
                      className="w-full px-4 py-2 border border-gray-500 rounded-lg 
                                                     bg-black/20 text-white focus:outline-none focus:ring-2 
                                                     focus:ring-purple-500 focus:border-transparent"
                      value={searchCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-gray-800 text-white"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
                                                 rounded-lg text-white font-semibold hover:from-purple-600 
                                                 hover:to-pink-600 transition-all duration-300 shadow-lg 
                                                 hover:shadow-purple-500/25"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="py-20 bg-black" id="competition-section">
              <div className="container mx-auto px-4">
                <div className="mb-16">
                  <h3 className="text-4xl font-bold">Singer Auditions</h3>
                  <div className="main-title-sec flex justify-between items-center">
                    <div></div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               
                  {Array.isArray(competitionEvents) &&
                  competitionEvents.length > 0 ? (
                    competitionEvents
                      .map((event) => {
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
                                handleClickDetailsParticipant(
                                  event.competitionId
                                )
                              }
                            >
                              {event.competitionName.length > 28
                                ? `${event.competitionName.slice(0, 28)}...`
                                : event.competitionName}
                            </h3>

                           
                            <p className="text-white/60 text-sm mb-4">
                              {event.description?.length > 245 ? (
                                <span>
                                  {event.description.slice(0, 245)}...
                                </span>
                              ) : (
                                event.description
                              )}
                            </p>

                            <div className="invition-date pt-4 border-t border-white/20 flex items-center justify-between text-sm text-white/70">
                              <div className="flex space-x-6">
                                <button className="flex items-center space-x-2">
                                  <Users className="w-5 h-5 text-gray-500" />
                                  <span className="text-sm text-gray-500">
                                   Votes:{event.totalVotes}
                                  </span>
                                </button>
                                <button className="flex items-center space-x-2">
                                  <Pencil className="w-5 h-5 text-gray-500" />
                                  <span className="text-sm text-gray-500">
                                  Feedbacks:{event.feedbackCount}
                                  </span>
                                </button>
                              </div>
                             
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <p className="text-white/60 text-center col-span-4">
                      <Spinner />
                    </p>
                  )}
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {displayEvents && displayEvents.length > 0 ? (
                    displayEvents.map((event) => (
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
                            handleClickDetailsParticipant(event.competitionId)
                          }
                        >
                          {event.competitionName?.length > 28
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
                                Votes:  {event.totalVotes || 0}
                              </span>
                            </button>
                            <button className="flex items-center space-x-2">
                              <Pencil className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-500">
                              Participants: {event.participantCount || 0}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/60 text-center col-span-4">
                      <Spinner />
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Performance Cards Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {displayData.length > 0 ? (
                                displayData.map((event) => {
                                    const correspondingCompetitionEvent = competitionEvents.find(
                                        (compEvent) => compEvent._id === event.competitionRegId
                                    );
                                    const userName = correspondingCompetitionEvent?.userId?.name || '';
                                    const profilePicture = correspondingCompetitionEvent?.userId?.profilePicture || '/images/default-avatar.png';
                                    const totalVotes = correspondingCompetitionEvent?.totalVotes || 0;
                                    const feedbackCount = correspondingCompetitionEvent?.feedbackCount || 0;
                                    const hasVoted = correspondingCompetitionEvent?.voters?.includes(loggedInUserId);

                                    return (
                                        <div
                                            key={event._id}
                                            className="group bg-gradient-to-br from-white/10 to-white/0 
                                                     backdrop-blur-lg rounded-3xl p-6 border border-white/30 
                                                     hover:border-purple-600 transform hover:scale-105 
                                                     hover:translate-y-4 transition-all duration-300 
                                                     shadow-lg shadow-purple-500/25"
                                        >
                                            {/* User Info */}
            {/* <h3 className="text-2xl font-semibold mb-3 text-white">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <MicVocal className="text-purple-400" />
                                                        {userName}
                                                    </div>
                                                    <img
                                                        src={profilePicture}
                                                        alt="Profile"
                                                        className="w-10 h-10 rounded-full border-2 border-white/20"
                                                    />
                                                </div>
                                            </h3> */}

            {/* Competition Title */}
            {/* <Link
                                                to={`/competition-events-details/${event.competitionId}`}
                                                className="block hover:text-purple-400 transition-colors duration-300"
                                            >
                                                <h6 className="text-lg font-semibold mb-4">
                                                    {event.performanceTitle || "Competition"}
                                                </h6>
                                            </Link> */}
            {/* {event.performanceFile ? (
                                                <div className="mb-6">
                                                    <iframe
                                                        width="100%"
                                                        height="200"
                                                        src={event.performanceFile}
                                                        frameBorder="0"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mb-6">
                                                    {event.videoLink && (
                                                        <iframe
                                                            width="100%"
                                                            height="200"
                                                            // src={`https://www.youtube.com/embed/${event.videoLink.match(/v=([^&]+)/)?.[1]}`}
                                                            src={`https://www.youtube.com/embed/${event.videoLink.match(/v=([^&]+)/)?.[1]}`}
                                                            frameBorder="0"
                                                            allowFullScreen
                                                        />
                                                    )}
                                                </div>
                                            )} */}
            {/* <VideoPlayer
                                                performanceFile={event.performanceFile}
                                                videoLink={event.videoLink}
                                            /> */}
            {/* Card Footer */}
            {/* <div className="pt-4 border-t border-white/20 
                                                        flex items-center justify-between">
                                                <div className="flex gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <CircleCheckBig className="w-5 h-5 text-purple-400" />
                                                        <span className="text-gray-300">{totalVotes}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="w-5 h-5 text-purple-400" />
                                                        <span className="text-gray-300">{feedbackCount}</span>
                                                    </div>
                                                </div>

                                                {role !== "judge" && (
                                                    <button
                                                        className="px-4 py-2 rounded-full bg-gradient-to-r 
                                                                 from-purple-400 to-blue-400 text-white 
                                                                 font-semibold shadow-md hover:scale-105 
                                                                 transition-all disabled:opacity-50 
                                                                 disabled:cursor-not-allowed"
                                                        onClick={() => handleVoteButtonClick(
                                                            event.competitionRegId,
                                                            event.userId
                                                        )}
                                                        disabled={hasVoted}
                                                    >
                                                        {hasVoted ? "Already Voted" : "Vote"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center text-xl text-white/60">
                                    No data found
                                </div>
                            )}
                        </div>  */}
          </div>
        </div>
      </div>

      {/* Voter Modal */}
      <VoterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        competition_Id={selected_CompetitionId}
        participantId={selectedParticipantId}
      />
    </div>
  );
};

export default SingerOrdinations;
