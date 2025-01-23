import React, { useEffect, useState } from 'react';
import EventCard from '../../components/common/Cards/EventCard';
import usePresentEventApi from '../../hooks/presentEvent';
import { Link, useNavigate } from 'react-router-dom';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);  // Manage loading state
    const [error, setError] = useState(null);  // Store error message
    const { getAllEvents } = usePresentEventApi(); // Fetch events from API
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await getAllEvents();  // Fetch all events from the API
                setEvents(allEvents);  // Store events in state
                setLoading(false);  // Set loading state to false after events are fetched
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
                setError('Failed to load events. Please try again later.');
            }
        };

        fetchEvents();  // Call fetchEvents when the page loads
    }, []);


    const handleView = (id) => {
        navigate(`/events_details/${id}`);
    };
    

    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Ultra Modern Hero Section */}
            <div className="relative min-f-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-900 to-blue-900">
                <div className="py-20 bg-gradient-to-b from-black to-purple-900/20">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">All  Events</h2>
                                <p className="text-white/60">Discover the most exciting  experiences</p>
                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full"></div> {/* Spinner */}
                                </div>
                            ) : (
                                events.map(event => (
                                    <EventCard
                                        // key={event.id}
                                        id={event._id}
                                        bannerImage={event.bannerImage}
                                        title={event.title}
                                        handleView={handleView}
                                    />
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEvents;
