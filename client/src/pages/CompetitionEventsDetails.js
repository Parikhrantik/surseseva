/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Calendar, Users } from 'lucide-react';
import useCompetitionMangementAuth from '../hooks/useCompetitionMangementAuth';

function CompetitionEventsDetails() {

    const { id } = useParams();
    const { competitionData, isLoading, error, getCompetitionDetailsId } = useCompetitionMangementAuth();

    useEffect(() => {
      if (id) {
        getCompetitionDetailsId(id);
      }
    }, [id]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 font-semibold text-lg">Error: {error}</p>
        </div>
      );
    }

  return (
    <>

    <div className="max-w-6xl mx-auto" >
       {competitionData ? (
      <div className="bg-white rounded-lg shadow-md p-8 mb-8" style={{ marginTop: '9rem' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#0a1851] mb-2">
            {competitionData.name}
            </h2>
            <div className="flex items-center text-gray-600 space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                EndDate-{new Date(competitionData.endDate).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                {/* <Users className="w-4 h-4 mr-1" /> */}
                {competitionData.timezone} 
              </span>
            </div>
          </div>
          <Link
            to={`/submit-performance/${competitionData._id}`}
            className="bg-[#0a1851] text-white px-6 py-2 rounded-md hover:bg-[#0a1851]/90 transition-colors"
          >
            Submit Performance
          </Link>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-600 mb-6">{competitionData.description}</p>

          <h3 className="text-xl font-semibold mb-2">Rules</h3>
          <div className="text-gray-600 whitespace-pre-line"   dangerouslySetInnerHTML={{ __html: competitionData.rules }}>
        
          </div>
        </div>
      </div>
    ) : (
        <p className="text-gray-500 text-center">
          No competition details available.
        </p>
      )}
      {/* <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-semibold mb-6">Submissions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {competition.submissions.map((submission: any) => (
            <div
              key={submission.id}
              className="border rounded-lg p-4"
            >
              <h4 className="font-medium mb-2">{submission.title}</h4>
              <p className="text-gray-600 text-sm mb-2">
                By {submission.profiles?.full_name}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {submission.description}
              </p>
              <a
                href={submission.performance_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a1851] hover:underline text-sm"
              >
                Watch Performance
              </a>
            </div>
          ))}
        </div>

        {competition.submissions.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No submissions yet. Be the first to participate!</p>
          </div>
        )}
      </div> */}
    </div>

   
    </>
  );
}

export default CompetitionEventsDetails;

