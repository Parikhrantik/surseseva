import React, { useState } from 'react';
import { Star } from 'lucide-react';
import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';
import { Link } from 'react-router-dom';
import RegistrationModal from '../components/forms/RegistrationModal';

const CompetitionEvents = () => {
  const { competitions, isLoading, error } = useCompetitionMangementAuth();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const openRegistrationModal = (competitionId, startDate,endDate) => {
    setSelectedCompetitionId(competitionId);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setIsRegistrationOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-sm mb-4">
              <Star className="h-4 w-4 inline mr-2 text-yellow-400" />
              Hot & Trending
            </span>
            <h2 className="text-4xl font-bold">Competition Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.isArray(competitions?.data) && competitions.data.length > 0 ? (
              competitions.data.map((competition) => (
                <div
                  key={competition._id}
                  className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        {competitions.data.indexOf(competition) + 1}
                      </div>
                    </div>
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                      Trending
                    </span>
                  </div>

                  <Link to={`/competition-events-details/${competition._id}`}>
                    <h3 className="text-lg font-semibold mb-3">{competition.name}</h3>
                  </Link>
                  <p className="text-white/60 text-sm mb-4">{competition.description}</p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(competition.startDate))} - {new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(competition.endDate))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/60 hover:bg-purple-500/20 transition-colors">
                        Share
                      </button>
                      <button className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/60 hover:bg-purple-500/20 transition-colors" onClick={() => openRegistrationModal(competition._id, competition.startDate, competition.endDate)}>
                        Participants
                      </button>
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
      </div>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        competitionId={selectedCompetitionId}
        competitionstartDate={selectedStartDate}
        competitionendDate={selectedEndDate}
      />

    </>
  );
};

export default CompetitionEvents;
