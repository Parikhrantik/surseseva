import React, { useState, useEffect } from 'react';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Edit2, Trash } from 'lucide-react';
import UpdateRegistrationModal from '../components/forms/UpdateRegistrationModal';
import { getParticipantPerformanceById } from '../hooks/usePerformanceAuth';
const MyCompetitions = () => {
  const { setId, loading, userEvents } = useCompetitionAuth();
  const userId = localStorage.getItem('userId');

  const API_URL = process.env.BASE_URL || 'http://34.122.208.248/node';
  // const API_URL = process.env.LOCAL_BASE_URL || 'http://localhost:5000';

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participantPerformance, setPerformance] = useState(false);
  console.log('participantPerformance', participantPerformance)
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  useEffect(() => {
    if (setId) {
      setId(userId);
    }
  }, [userId, setId]);

  // Extracting competitionEvents
  const competitionEvents = userEvents?.competitionEvents || [];

  const handleDelete = (competitionId) => {
    const userId = localStorage.getItem('userId');
    const data = { userId, competitionId };
    // debugger
    fetch(`${API_URL}/competition/delete-competition-registration`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Event deleted');
          navigate('/my-competitions');
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error deleting event');
      });
  };


  const handleEdit = async (event) => {
    setSelectedCompetition(event);
    setIsModalOpen(true);
    const performance = await getParticipantPerformanceById(event._id, event.userId);
    setPerformance(performance.data);


  };
  const navigateHandler = (competitionId) => {
    navigate(`/competition-details/${competitionId}`)
  }
  return (

    <div className="my-competition-sec py-20 bg-black">
      <div className="container mx-auto px-4">


        <div className=" mb-16">

          <h3 className="text-4xl font-bold" style={{ color: 'white' }}>My Competition</h3>
          <p className="text-white mt-2">Manage and track your events</p>

        </div>
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
          {competitionEvents.length > 0 ? (
            competitionEvents.map((competition, index) => (
              <div
                key={competition._id}
                style={{ cursor: 'pointer' }}
                className="group invition-card bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"


              >

                <div className=" flex items-center justify-end space-x-2">
                  <div className='edit-option'>
                    {!competition.competitionendDate ||
                      new Date(competition.competitionendDate) > new Date() ? (
                      <button
                        // onClick={() => handleEdit(competition._id)}
                        className="p-1 bg-white rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                        onClick={() => handleEdit(competition)}

                      >
                        <Edit2 size={18} />
                      </button>
                    ) : null}
                    <button
                      onClick={() => handleDelete(competition._id)}
                      className="p-1 bg-white rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center  mb-6" onClick={() => navigateHandler(competition._id)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <span className="text-lg text-white px-3 py-1 rounded-full capitalize">
                    {competition.competitionName}

                  </span>
                </div>

                <h3 className="text-sm text-white px-3 py-1 rounded-full capitalize">
                  {competition.category}
                </h3>

                {/* <p className="text-white/60 text-sm mb-4">
                  Competition ID: {competition.competitionId}
                </p> */}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white ">

                      Last Date: {format(new Date(competition.competitionendDate), 'MMMM do yyyy')}

                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-white ">Votes 200k</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2">

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
      </div>

      {isModalOpen && (
        <UpdateRegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCompetition(null);
          }}
          eventId={selectedCompetition._id || ''}
          competitionId={selectedCompetition._id || ''}
          performanceId={participantPerformance._id || ''}
          isEditing={true}
          competiId={participantPerformance.competitionId || ''}
          eventDate={selectedCompetition.competitionstartDate}
          updatedAt={selectedCompetition.competitionendtDate}
          performance={participantPerformance}
        // eventStartDate={competitionID[0]?.eventStartDate}
        // eventEndDate={competitionID[0]?.eventEndDate}
        // onEventUpdate={(updatedEvent) => setUpdatedEvent(updatedEvent)}
        />
      )}
    </div>
  );
};

export default MyCompetitions;
