import React, { useState } from 'react';
import { ThumbsUp, Share2, Calendar, MapPin, Users, UserPlus } from 'lucide-react';
import RegistrationModal from '../../forms/RegistrationModal/indx';

const EventCard = ({
  id,
  title,
  description,
  mediaUrl,
  mediaType,
  votes,
  eventDate,
  location,
  attendees,
  category
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);
  const [isHovered, setIsHovered] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
      localStorage.setItem(`voted_${id}`, 'true');
    }
  };

  React.useEffect(() => {
    const voted = localStorage.getItem(`voted_${id}`);
    if (voted) setHasVoted(true);
  }, [id]);

  const handleShare = () => {
    navigator.share({
      title,
      text: description,
      url: window.location.href
    }).catch(console.error);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold">
              {category}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {/* {} */}
                {eventDate}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {attendees} attending
              </div>
            </div>
            <div className="mb-4 rounded-lg overflow-hidden">
              {mediaType === 'video' ? (
                <video
                  controls
                  className="w-full rounded-lg transform transition-transform duration-300"
                  src={mediaUrl}
                  style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
                />
              ) : (
                <audio
                  controls
                  className="w-full"
                  src={mediaUrl}
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">{voteCount} votes</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                {localStorage.getItem('token') ? (
                  <button
                    onClick={() => {
                      setIsRegistrationOpen(true);
                    }}
                    className="flex items-center space-x-2 px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Participate</span>
                  </button>
                ) : (
                  <button
                    onClick={handleVote}
                    disabled={hasVoted}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 ${hasVoted
                        ? 'bg-gray-100 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105'
                      }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{hasVoted ? 'Voted' : 'Vote'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        eventId={id}
        eventDate={eventDate}
      />
    </>
  );
};

export default EventCard;

