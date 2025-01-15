import React, { useState } from 'react';
import CompetitionForm from './CompetitionForm';
import PerformanceForm from './PerformanceForm';
import useCompetitionAuth from '../../../hooks/useCompetionAuth';
import usePerformanceAuth from '../../../hooks/usePerformanceAuth';

const RegistrationModal = ({ isOpen, onClose, eventId,competitionId,performanceId,competiId,eventDate,updatedAt }) => {
  // debugger
    console.log(updatedAt,"updatedAtupdatedAtupdatedAtupdatedAtupdatedAt")
  const [step, setStep] = useState(1);
  const [competitionData, setCompetitionData] = useState();
  const [performanceData, setPerformanceData] = useState();

  const { updateCompetition, isLoading: isCompetitionLoading } = useCompetitionAuth();
  const { updatePerformance, isLoading: isPerformanceLoading } = usePerformanceAuth();

  if (!isOpen) return null;

  const handleCompetitionSubmit = async (data) => {
    try {
      const response = await updateCompetition(eventId, data);
      setCompetitionData(response.data);
      setStep(2);
    } catch (error) {
      console.error('Error registering competition:', error);
    }
  };


  const handlePerformanceSubmit = async (data) => {
    // debugger
    try {
      const response = await updatePerformance(performanceId, data);
      setPerformanceData(response.data);
      onClose();
      setStep(1);
    } catch (error) {
      console.error('Error submitting performance:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {step === 1 ? (
            <CompetitionForm
              onNext={handleCompetitionSubmit}
              onClose={onClose}
              isLoading={isCompetitionLoading}
              eventId={eventId}
              competitionData={competitionData}
              competitionId={competitionId}
              eventDate={eventDate}
              updatedAt={updatedAt}
            />
          ) : (
            <PerformanceForm
              onSubmit={handlePerformanceSubmit}
              onBack={() => setStep(1)}
              onClose={onClose}
              isLoading={isPerformanceLoading}
              eventId={eventId}
              performanceData={performanceData}
              performanceId={performanceId}
              competiId={competiId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;

