
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, StepBackIcon, StepBack, LucideStepBack } from 'lucide-react';
import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import { format } from 'date-fns';

const ParticipantCompetitionDetails = () => {
  const { setId, loading, userEvents } = useCompetitionAuth();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  console.log('userEvents', userEvents)
  const { id } = useParams();

  useEffect(() => {
    if (setId) {
      setId(userId);
    }
  }, [userId, setId, userEvents]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

console.log('userEvents',userEvents)
const handleBack = (competitionId) => {
  navigate("/my-competitions");
}
  return (

<div className='container mx-auto px-4'>
    <div className="competition-main-sec max-w-8xl mx-auto mt-9 flex flex-col space-y-4">
      {/* Back Button */}
      <br />
      <br />
      <div className="flex items-center justify-start mb-4">
        <button className="text-white flex items-center space-x-2 px-4 py-2 rounded-full  text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
          onClick={() => navigate(-1)}
        >

          <span className="flex items-center"> <LucideStepBack className="w-4 h-4 mr-2" />Back</span>

        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* First Column - 8/12 width */}
        <div className="Competition-details">
          {userEvents ? (
            <div className="Competition-details-items rounded-lg shadow-md p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#0a1851] mb-2">
                    {userEvents?.competitionEvents && userEvents?.competitionEvents[0]?.competitionName}
                  </h2>
                  <div className=" flex items-center text-gray-600 space-x-4">
                    <span className="latested-date flex items-center">
                      <span>Last Date of Submission</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {userEvents?.competitionEvents && userEvents?.competitionEvents[0]?.competitionendDate ? (
                        format(new Date(userEvents.competitionEvents[0].competitionendDate), 'MMMM do yyyy')
                      ) : (
                        'N/A' // Fallback text if the date is invalid or missing
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h4 className="text-xl font-semibold mb-2">Competition Category</h4>
                <p className="text-gray-600 mb-6">{userEvents?.competitionEvents && userEvents?.competitionEvents[0]?.category}</p>
              </div>

              <div className="prose max-w-none">
                <h4 className="text-xl font-semibold mb-2">Performance Title </h4>
                <p className="text-gray-600 mb-6">{userEvents?.performanceEvents && userEvents?.performanceEvents[0]?.performanceTitle}</p>
              </div>

              <div className="prose max-w-none">
                <h4 className="text-xl font-semibold mb-2">Performance Description </h4>
                <p className="text-gray-600 mb-6">{userEvents?.performanceEvents && userEvents?.performanceEvents[0]?.description}</p>
              </div>

              <div className="prose max-w-none">
                <h4 className="text-xl font-semibold mb-2">Performance Tags </h4>
                <p className="text-gray-600 mb-6">{userEvents?.performanceEvents && userEvents?.performanceEvents[0]?.tags.toString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No competition details available.</p>
          )}
        </div>

        {/* Second Column - 4/12 width */}
        <div className="Competition-video">
          <video
            src={`${userEvents?.performanceEvents && userEvents?.performanceEvents[0]?.performanceFile}`}
            controls
            className="w-full h-full rounded-lg shadow-md"
            style={{ minHeight: '300px' }}
          ></video>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ParticipantCompetitionDetails;

