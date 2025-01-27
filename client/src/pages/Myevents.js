import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Edit2, Plus, Search, Trash2 } from 'lucide-react';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import eventsData from '../utils/events.json'; // Assuming you have JSON data here
import UpdateRegistrationModal from '../components/forms/UpdateRegistrationModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Myevents() {
  // const API_URL = process.env.BASE_URL || 'http://35.208.79.246/node';
  // const API_URL = process.env.LIVE_BASE_URL || 'http://localhost:5000';
  const API_URL = process.env.REACT_APP_BASE_URL || 'http://34.122.208.248/node';
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { setId, loading, userEvents } = useCompetitionAuth();

  const competitionID = userEvents?.competitionEvents?.filter(event => event?.eventId === selectedEvent?.id) || [];
  const updatedAt = userEvents?.competitionEvents?.filter(event => event?.eventId === selectedEvent?.id) || [];
  console.log('updatedAtupdatedAtupdatedAt', updatedAt)
  const performanceId = userEvents?.performanceEvents?.[0]?._id;
  const competiId = userEvents?.performanceEvents?.[0]?.competitionId;
  // const updatedAt = userEvents?.competitionEvents?.[0]?.updatedAt;

  useEffect(() => {
    if (setId) {
      setId(userId);
    }
  }, [userId, setId]);

  useEffect(() => {
    if (loading) return;
    const eventIds = userEvents?.competitionEvents?.map(event => event.eventId) || [];
    const filteredEvents = eventsData.filter(event => eventIds.includes(event.id));
    const sortedEvents = filteredEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    setEvents(sortedEvents);
    if (updatedEvent) {
      const updatedEventIndex = sortedEvents.findIndex(event => event.id === updatedEvent.id);
      if (updatedEventIndex > -1) {
        const newSortedEvents = [...sortedEvents];
        newSortedEvents[updatedEventIndex] = updatedEvent;
        setEvents(newSortedEvents);
      }
    }
  }, [userEvents, loading, updatedEvent,]);


  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (eventId) => {
    const userId = localStorage.getItem('userId');
    const data = { userId, eventId };

    fetch(`${API_URL}/competition/delete-competition-registration`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Event deleted successfully');
          navigate('/events');
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error deleting event');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events || !Array.isArray(events)) {
    return <div>No events to display</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
            <p className="text-gray-600 mt-2">Manage and track your events</p>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
            <Plus size={20} />
            <span>Create New Event</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Music</option>
              </select>
              <select className="px-4 py-2 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500">
                <option>All Status</option>
                <option>Upcoming</option>
                <option>Past</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const isEditable = new Date(event.date) > new Date();
            const statusColor =
              event.status === 'Upcoming'
                ? 'bg-green-100 text-green-800'
                : event.status === 'Open'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800';


            return (
              <div
                key={event.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <iframe src={`https://www.youtube.com/embed/${event.mediaUrl.split('v=')[1]}?autoplay=1`} width="640" height="210" allowFullScreen autoplay></iframe>
                  </div>
                  <div className="">
                    {isEditable && (
                      <button
                        onClick={() => handleEdit(event)}
                        className="absolute bottom-4 right-4 p-2 bg-white rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </div>
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600">{event.category}</span>
                    <span className="text-sm text-gray-500">
                      Created {new Date(event.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-purple-500" />
                      {event.eventStartDate}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-purple-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-purple-500" />
                      {event.attendees.toLocaleString()} attendees
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 bg-white rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 bg-white rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <UpdateRegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          eventId={selectedEvent?.id}
          competitionId={competitionID[0]?._id}
          performanceId={performanceId}
          isEditing={true}
          competiId={competiId}
          eventDate={selectedEvent?.eventDate}
          updatedAt={competitionID[0]?.updatedAt}
          // eventStartDate={competitionID[0]?.eventStartDate}
          // eventEndDate={competitionID[0]?.eventEndDate}
          onEventUpdate={(updatedEvent) => setUpdatedEvent(updatedEvent)}
        />
      )}
    </div>
  );
}


