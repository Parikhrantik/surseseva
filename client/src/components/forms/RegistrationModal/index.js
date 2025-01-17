import React, { useState } from 'react';
import CompetitionForm from './CompetitionForm';
import PerformanceForm from './PerformanceForm';
import useCompetitionAuth from '../../../hooks/useCompetionAuth';
import usePerformanceAuth from '../../../hooks/usePerformanceAuth';


const RegistrationModal = ({ isOpen, onClose,competitionId,competitionstartDate,competitionendDate}) => {
  console.log(competitionendDate,"competitioncompetitioncompetition")
  // debugger
  const [step, setStep] = useState(1);
  const [competitionData, setCompetitionData] = useState(null);
  const { competitionRegistration, isLoading: isCompetitionLoading } = useCompetitionAuth();
  const { submitPerformance, isLoading: isPerformanceLoading } = usePerformanceAuth();
// console.log('submitPerformance', submitPerformance)
  if (!isOpen) return null;

  const handleCompetitionSubmit = async (data) => {
    try {
      const response = await competitionRegistration(data);
      setCompetitionData(response.data); // Store competition data if needed
      setStep(2); // Move to the next step
    } catch (error) {
      console.error('Error registering competition:', error);
    }
  };

  const handlePerformanceSubmit = async (data) => {
    // debugger
    try {
      await submitPerformance(data);
      console.log('Performance Data:', data);
      // Reset modal state after submission
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
              competitionId={competitionId} 
              competitionstartDate={competitionstartDate} 
              competitionendDate={competitionendDate}
            />
          ) : (
            <PerformanceForm
              onSubmit={handlePerformanceSubmit}
              onBack={() => setStep(1)}
              onClose={onClose}
              isLoading={isPerformanceLoading}
              competitionId={competitionId} 
              competitionData={competitionData} // Pass competitionDat
           
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
