import React, { useEffect, useState } from 'react';
import { ExternalLink, Heart, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import usePresentEventApi from '../../hooks/presentEvent';

// const API_URL = process.env.BASE_URL || 'http://localhost:5000';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://34.122.208.248/node';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getEventById } = usePresentEventApi();

    useEffect(() => {
        if (!id || event) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);
                const eventData = await getEventById(id);
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
                setError('Failed to load event details.');
            }
        };

        fetchEvent();
    }, [id, event, getEventById]);

    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);
        return match ? match[1] : null;
    };

    return (
        //     <div className="max-w-6xl mx-auto">
        //     <div className="bg-white rounded-lg shadow-md p-8 mb-8 mt-24">
        //       {loading ? (
        //         <p className="text-gray-500 text-center">Loading event details...</p>
        //       ) : error ? (
        //         <p className="text-red-500 text-center">{error}</p>
        //       ) : event ? (
        //         <div className="bg-white rounded-lg overflow-hidden">
        //           {/* Main Image - Fixed height container with full image display */}
        //           <div className="w-full h-96">
        //             {event.bannerImage ? (
        //               <img
        //                 src={`${API_URL}/get-file/${event.bannerImage}`}
        //                 alt={event.title}
        //                 className="w-full h-full object-cover object-center"
        //               />
        //             ) : (
        //               <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        //                 <span className="text-gray-400">No image available</span>
        //               </div>
        //             )}
        //           </div>

        //           <div className="p-6">
        //             {/* Title */}
        //             <h1 className="text-3xl font-bold text-gray-800 mb-4">
        //               {event.title}
        //             </h1>

        //             {/* Video Grid - Fixed aspect ratio containers */}
        //             {event.videoUrls && event.videoUrls.length > 0 && (
        //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //                 {event.videoUrls.map((videoUrl, index) => (
        //                   <div key={index} className="group">
        //                     <div className="relative w-full pt-[56.25%]">
        //                       <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
        //                         <iframe 
        //                           src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}?autoplay=0`}
        //                           className="w-full h-full"
        //                           allowFullScreen
        //                         />
        //                       </div>
        //                       {/* Floating Category Badge */}
        //                       <div className="absolute top-4 left-4">
        //                         <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white">
        //                           Video {index + 1}
        //                         </span>
        //                       </div>
        //                       {/* Action Buttons */}
        //                       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        //                         <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
        //                           <Heart className="h-4 w-4 text-white" />
        //                         </button>
        //                         <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
        //                           <Share2 className="h-4 w-4 text-white" />
        //                         </button>
        //                       </div>
        //                       {/* External Link */}
        //                       <a
        //                         href={videoUrl}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="absolute bottom-4 right-4 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        //                       >
        //                         <ExternalLink className="w-4 h-4" />
        //                         <span className="underline">Open in YouTube</span>
        //                       </a>
        //                     </div>
        //                   </div>
        //                 ))}
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       ) : (
        //         <p className="text-gray-500 text-center">No event details available.</p>
        //       )}
        //     </div>
        //   </div>
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 mt-24">
                {loading ? (
                    <p className="text-gray-500 text-center">Loading event details...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : event ? (

                    <div className="bg-white rounded-lg overflow-hidden">
                        {/* Main Image - Fixed height container with full image display */}
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {event.title}
                            </h1>
                        </div>
                        <div className="w-full ">
                            {event.bannerImage ? (
                                <img
                                    src={`${API_URL}/get-file/${event.bannerImage}`}
                                    alt={event.title}
                                    className="banner image w-full h-full object-center" // Removed object-cover
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}
                        </div>

                        <div className="pt-9 p-6">
                            {/* Video Grid - Fixed aspect ratio containers */}
                            {event.videoUrls && event.videoUrls.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {event.videoUrls.map((videoUrl, index) => (
                                        <div key={index} className="group">
                                            <div className="relative w-full pt-[56.25%]">
                                                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}?autoplay=0`}
                                                        className="w-full h-full"
                                                        // width="640" height="300" allowFullScreen autoplay
                                                        allowFullScreen autoplay
                                                    />
                                                </div>
                                                {/* Floating Category Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white">
                                                        Video {index + 1}
                                                    </span>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
                                                        <Heart className="h-4 w-4 text-white" />
                                                    </button>
                                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
                                                        <Share2 className="h-4 w-4 text-white" />
                                                    </button>
                                                </div>
                                                {/* External Link */}
                                                <a
                                                    href={videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute bottom-4 right-4 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span className="underline">Open in YouTube</span>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No event details available.</p>
                )}
            </div>
        </div>

    );
};

export default EventDetail;