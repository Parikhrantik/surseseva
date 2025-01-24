import React, { useState } from 'react';
import { ThumbsUp, Share2, Calendar, MapPin, Heart, UserPlus } from 'lucide-react';
import RegistrationModal from '../../forms/RegistrationModal';
// const API_URL = process.env.BASE_URL || 'http://localhost:5000';
const API_URL = process.env.BASE_URL || 'http://34.122.208.248/node';
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
  eventStartDate,
  eventEndDate,
  category,
  bannerImage,
  handleView
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);
  const [isHovered, setIsHovered] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // const handleVote = () => {
  //   if (!hasVoted) {
  //     setVoteCount(prev => prev + 1);
  //     setHasVoted(true);
  //     localStorage.setItem(`voted_${id}`, 'true');
  //   }
  // };

  // React.useEffect(() => {
  //   const voted = localStorage.getItem(`voted_${id}`);
  //   if (voted) setHasVoted(true);
  // }, [id]);

  const handleShare = () => {
    navigator.share({
      title,
      text: description,
      url: window.location.href
    }).catch(console.error);
  };

  return (
    <>
      <div className="group relative">
        {/* Card Background with Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>

        {/* Card Content */}
        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          {/* Event Image */}
          <div className="relative aspect-[16/9]">
            <div className="mb-4 rounded-lg overflow-hidden  cursor-pointer" onClick={() => handleView(id)}>
              {/* {mediaType === 'video' ? (
                <iframe src={`https://www.youtube.com/embed/${mediaUrl.split('v=')[1]}?autoplay=1`} width="640" height="300" allowFullScreen autoplay></iframe>
              ) : (
                <audio controls className="w-full" src={mediaUrl} />
              )} */}
              <img
                // src={`${API_URL}/get-file/${bannerImage}`}
                src={`${API_URL}/get-file/${bannerImage}`} //
                alt={title} // Use event title for the alt text
                // className="w-full h-full object-cover"
                className="w-full h-[369px] object-cover mx-auto"
              />
            </div>

            {/* Floating Category Badge */}
            {/* <div className="absolute top-4 left-4">
              <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm">{category}</span>
            </div> */}

            {/* Action Buttons */}
            {/* <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
                <Heart className="h-4 w-4" />
              </button>
              <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
                <Share2 className="h-4 w-4" />
              </button>
            </div> */}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            {/* <p className="text-white/60 mb-4">{description}</p> */}

            {/* <div className="flex items-center gap-4 text-white/60 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm"> {eventStartDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location}</span>
              </div>
            </div> */}

            <div className="flex items-center justify-between">

              {/* <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">{voteCount} votes</span>
              </div> */}
              {/* <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" style={{ color: 'black' }} />
                  <span style={{ color: 'black' }}>Share</span>
                </button>
                {localStorage.getItem('token') ? (


                  <button className="px-4 py-2 flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium hover:opacity-90 transition-opacity" onClick={() => {
                    setIsRegistrationOpen(true);
                  }}>
                    <UserPlus className="h-5 w-5" />
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
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        eventId={id}
        eventDate={eventDate}
        eventStartDate={eventStartDate}
        eventEndDate={eventEndDate}
      />
    </>
  );
};

export default EventCard;