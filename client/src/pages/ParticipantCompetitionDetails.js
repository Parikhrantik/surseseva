
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CircleCheckBig, MessageSquare, Share2, LucideStepBack } from 'lucide-react';
// import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';
import useCompetitionAuth from '../hooks/useCompetionAuth';
import { format } from 'date-fns';



const ParticipantCompetitionDetails = () => {
  const { setId, loading, approvedParticipantCompitions } = useCompetitionAuth();
  const [showAll, setShowAll] = useState(false); // State to toggle full comments
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  console.log('approvedParticipantCompitions', approvedParticipantCompitions)
  const { id } = useParams();

  const filteredCompetationData = approvedParticipantCompitions?.competitionEvents?.filter((item) => item._id === id);
  const filteredPerformanceData = approvedParticipantCompitions?.performanceEvents?.filter((item) => item.competitionRegId === id);
  // console.log('filteredCompetationData', filteredCompetationData)
  // console.log('filteredPerformanceData', filteredPerformanceData)
  useEffect(() => {
    if (setId) {
      setId(userId);
    }
  }, [userId, setId, approvedParticipantCompitions]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }






  const handleToggleComments = () => {
    setShowAll(!showAll);
  };


  const feedbacksToDisplay = showAll
    ? filteredCompetationData?.[0]?.feedbackDetails
    : filteredCompetationData?.[0]?.feedbackDetails?.slice(0, 3);

  return (

    <div className="container mx-auto px-4 bg-black">
      <div className="competition-main-sec max-w-8xl mx-auto mt-9 flex flex-col space-y-8 text-white">
        {/* Back Button */}
        <div className="flex items-center justify-start mb-6">
          <button
            className="text-purple-600 flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
            onClick={() => navigate(-1)}
          >
            <LucideStepBack className="w-4 h-4 mr-2" />
            <span>Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* First Column - 4/12 width */}
          <div className="md:col-span-5">
            <div className="competition-details-items rounded-lg shadow-lg p-6" style={{ backgroundColor: '#8a2be252' }}>
              <div className="flex items-center justify-center bg-gray-500 rounded-lg h-80">
                <video
                  src={filteredPerformanceData?.[0]?.performanceFile}
                  controls
                  className="w-full h-full rounded-lg"
                  style={{ minHeight: "300px" }}
                ></video>
              </div>
            </div>
          </div>

          {/* Second Column - 8/12 width */}
          <div className="md:col-span-7">
            <div className="competition-details-items rounded-lg shadow-lg p-6" style={{ backgroundColor: '#8a2be252' }}>
              <div className="space-y-4">
                {/* Content Section */}
                {/* <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>Last Date of Submission</span>
                    <span>
                      {filteredCompetationData && filteredCompetationData[0] && filteredCompetationData[0].competitionendDate
                        ? format(
                          new Date(filteredCompetationData[0].competitionendDate),
                          "MMMM do yyyy"
                        )
                        : "N/A"}
                    </span>
                  </div>
                </div> */}

                <h2 className="text-xl font-semibold text-white mt-4">
                  {filteredCompetationData?.[0]?.competitionName || ""}
                </h2>
                <p className="text-gray-400 mt-2">
                  <strong>Category:</strong> {filteredCompetationData?.[0]?.category || ""}
                </p>
                <p className="text-gray-400 mt-2">
                  <strong>Performance Title:</strong> {filteredPerformanceData?.[0]?.performanceTitle || ""}
                </p>
                <p className="text-gray-400 mt-2">
                  <strong>Description:</strong> {filteredPerformanceData?.[0]?.description || ""}
                </p>
                <p className="text-gray-400 mt-2">
                  <strong>Tags:</strong> {filteredPerformanceData?.[0]?.tags?.toString() || ""}
                </p>

                {/* Interaction Buttons */}
                <div className="flex items-center gap-4 mt-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <CircleCheckBig /> <span>{filteredCompetationData?.[0]?.totalVotes?.toString() || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare /> <span>{filteredCompetationData?.[0]?.feedbackCount?.toString() || 0}</span>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Share2 />
                  </div> */}
                </div>

                {/* Comments Section */}
                <div className="pt-8">
                  {feedbacksToDisplay?.map((feedback, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border  rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-600">
                          <img src="/images/default-avatar.png" className="w-full h-full rounded-full" alt="default-profile" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{feedback.voterName}</span>
                              <span className="text-gray-400 text-sm">• {format(new Date(), "MMMM do yyyy")}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-2">{feedback.feedbackComment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">


                    {filteredCompetationData?.[0]?.feedbackDetails?.length > 3 && (
                      <button
                        onClick={handleToggleComments}
                        className="demo-btn px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all transform hover:-translate-y-1"
                      >
                        {showAll ? 'View less comments' : `View full comments (+${filteredCompetationData?.[0]?.feedbackDetails?.length - 3} comments)`}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


  );
}

export default ParticipantCompetitionDetails;

