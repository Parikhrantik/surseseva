import React, { useState, useEffect } from 'react';

import useCompetitionAuth from '../hooks/useCompetionAuth';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner';

import { Link, useNavigate } from 'react-router-dom';
import { CircleCheckBig, MessageSquare, MicVocal, Play } from 'lucide-react';
import VoterModal from './modal/VoterModal';
const SingerOrdinations = () => {

    const { Performances, isLoading, error } = useCompetitionAuth();
    console.log(Performances, "PerformancesPerformancesPerformances")
    const [selected_CompetitionId, setSelected_CompetitionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParticipantId, setSelectedParticipantId] = useState(null);
    const loggedInUserId = localStorage.getItem("userId");
    const [hasVoted, setHasVoted] = useState(false);
    const handleFeedbackSubmit = (data) => {

    };

    const navigate = useNavigate();
    let toastId = null;





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



    const handleVoteButtonClick = (competitionId, selectedParticipantId) => {
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
        const userHasVoted = competitionEvents.some(event => event.competitionId === competitionId && event.loggedInUserId === loggedInUserId);
        if (userHasVoted) {
            // Change the button color to green
            const voteButton = document.getElementById(`vote-button-${competitionId}`);
            if (voteButton) {
                voteButton.style.backgroundColor = 'green';
            }
            setHasVoted(true); // Update the hasVoted state
            return;
        }

        // Open the voting modal if the user is eligible
        openvoterModal(competitionId, participantId);
    };


    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Ultra Modern Hero Section */}
            <div className="relative min-f-screen flex items-center justify-center overflow-hidden ">
                <div className="py-20 bg-gradient-to-b from-black to-purple-900/20">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">Singer Auditions</h2>
                                <p className="text-white p-8/60">Discover the most exciting  experiences</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                            {performanceEvents.length > 0 ? (
                                performanceEvents.map((event, index) => {
                                    // Find the corresponding competitionEvent for the current performanceEvent
                                    const correspondingCompetitionEvent = competitionEvents.find(
                                        (compEvent) => compEvent.competitionId === event.competitionId
                                    );

                                    // Get totalVotes from the corresponding competitionEvent or default to 0
                                    const userName = correspondingCompetitionEvent?.userId?.name || '';
                                    const profilePicture = correspondingCompetitionEvent?.userId?.profilePicture || '/images/default-avatar.png';
                                    const totalVotes = correspondingCompetitionEvent?.totalVotes || 0;
                                    const feedbackCount = correspondingCompetitionEvent?.feedbackCount || 0;
                                    const hasVoted = correspondingCompetitionEvent?.voters?.includes(loggedInUserId);

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
                                                    <div className="flex items-center justify-between mb-6">

                                                        {/* <span className="text-xs bg-green-500/30 text-green-600 px-3 py-1 rounded-full font-semibold">
                  {event.status || "Pending"}
                </span> */}
                                                    </div>
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
                                                    <Link to={`/competition-events-details/${event.competitionId}`} className="hover:text-purple-600 transition-colors duration-300">
                                                        <h6 className="text-2sm font-semibold mb-3 text-white hover:text-gradient-to-r from-purple-500 to-pink-500">
                                                            {event.performanceTitle || "Competition"}
                                                        </h6>
                                                    </Link>

                                                    {/* <p className="text-white/80 text-sm mb-4">{event.description || "No description available"}</p> */}

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
                                                            // disabled={hasVoted}
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
        </div>
    )
}

export default SingerOrdinations