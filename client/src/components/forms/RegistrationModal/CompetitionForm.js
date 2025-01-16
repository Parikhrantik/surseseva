import React from 'react';
import { X } from 'lucide-react';


const CompetitionForm = ({ onNext, onClose,eventId,eventStartDate,eventEndDate,eventDate}) => {
  
   console.log(eventEndDate,"eventDateeventDateeventDateeventDateeventDate")
  const userid = localStorage.getItem("userId");
  const [formData, setFormData] = React.useState({
    userId:userid,
    eventId: eventId,
    eventDate:eventDate,
    eventStartDate:new Date(eventStartDate).toISOString().split('T')[0],
    eventEndDate:new Date(eventEndDate).toISOString().split('T')[0],
    competitionName: '',
    category: '',
    agreedToRules: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Competition Registration</h2>
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
          style={{color:"black"}}
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
            style={{color:"black"}}
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
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CompetitionForm;
