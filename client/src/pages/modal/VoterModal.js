import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useVote from '../../hooks/useVote';


const VoterModal = ({ isOpen, onClose, competition_Id,onSubmit, participantId }) => {
  // console.log(participantId, "eddddddddddddddd");
  const voter_id = localStorage.getItem('userId');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { voterFeedback, isLoading } = useVote(); // Use the hook for API call

  const handleClose = () => {
    onClose();
    reset(); // Reset form fields on close
  };

  if (!isOpen) return null;

  const onSubmitForm = async (formData) => {
    const feedbackData = {
      voter_id,
      competitionId: competition_Id,
      participant_id: participantId,
      voterFeedback: formData.voterFeedback,
    };
    
    try {
      await voterFeedback(feedbackData);
      onSubmit("submitted");
      handleClose();
    } catch (error) {
      console.error("Feedback submission failed", error);
      handleClose();
      // navigate('/')
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          type="button"
          className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-full"
          onClick={handleClose}
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Provide Feedback</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your feedback..."
            rows={4}
            style={{ color: "black" }}
            {...register('voterFeedback', { required: "Feedback is required" })}
          />
          {errors.voterFeedback && <p className="text-red-500 text-sm">{errors.voterFeedback.message}</p>}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded"
              {...register('isVoter', { required: "vote is required" })}
            />
            <label className="text-sm text-gray-600">Vote</label>
           
          </div>
          {errors.isVoter && <p className="text-red-500 text-sm">{errors.isVoter.message}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoterModal;
