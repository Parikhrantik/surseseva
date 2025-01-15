import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import useCompetitionAuth from '../../../hooks/useCompetionAuth';

const CompetitionForm = ({ onNext, onClose, eventId, competitionData, competitionId, eventDate, updatedAt }) => {
  // debugger
  console.log(updatedAt, "updatedAtupdatedAt");

  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    userId: userId,
    eventId: eventId,
    eventDate: eventDate,
    competitionName: '',
    category: '',
    agreedToRules: false,
  });

  const { getCompetitionDetailsId, isLoading } = useCompetitionAuth();
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-gray-400'); // Default button color

  useEffect(() => {
    if (competitionId) {
      getCompetitionDetailsId(competitionId).then((data) => {
        if (data.success) {
          setFormData({
            userId: data.data.userId,
            eventId: data.data.eventId,
            competitionName: data.data.competitionName,
            eventDate: data.data.eventDate,
            category: data.data.category,
            agreedToRules: data.data.agreedToRules,
          });
        }
      });
    } else if (competitionData) {
      setFormData({
        userId: competitionData.userId,
        eventId: competitionData.eventId,
        competitionName: competitionData.competitionName,
        eventDate: competitionData.eventDate,
        category: competitionData.category,
        agreedToRules: competitionData.agreedToRules,
      });
    }

    // Compare the eventDate with the current date
  const currentDate = new Date();
  const eventDateDate = new Date(eventDate);
  const updatedAtDate = new Date(updatedAt);
  // console.log("Event Date:", eventDateDate);
  // console.log("Current Date:", currentDate);
  // console.log("Updated At Date:", updatedAtDate);

 
  if (eventDateDate < currentDate) {
    // debugger
    setIsButtonDisabled(true); 
  } else {
    // Check if the updatedAt date is in the past
    if (updatedAtDate < currentDate) {
      setIsButtonDisabled(true); // Disable the button if updatedAt is in the past
    } else {
      setIsButtonDisabled(false); // Enable the button if updatedAt is in the future or today
    }
  }
}, [competitionId, competitionData, eventId, userId, updatedAt, eventDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Pass the form data to the parent component
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {competitionData ? 'Update Competition' : 'Competition Registration'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Competition Name
          </label>
          <select
            required
            value={formData.competitionName}
            onChange={(e) => setFormData({ ...formData, competitionName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Competition</option>
            <option value="singing">Singing Competition</option>
            <option value="dancing">Dancing Competition</option>
            <option value="music">Music Competition</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            <option value="amateur">Amateur</option>
            <option value="professional">Professional</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rules"
            required
            checked={formData.agreedToRules}
            onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="rules" className="text-sm text-gray-600">
            I agree to the competition rules and terms
          </label>
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full py-3 px-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-purple-600'} text-white rounded-lg hover:${isButtonDisabled ? '' : 'bg-purple-700'} transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
        >
          {competitionData ? 'Update' : 'Next'}
        </button>
      </form>
    </div>
  );
};

export default CompetitionForm;
