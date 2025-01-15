import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import usePerformanceAuth from '../../../hooks/usePerformanceAuth';

const PerformanceForm = ({
  onSubmit,
  onBack,
  onClose,
  eventId,
  performanceId,
  userId,
  competiId,
  error,
}) => {
  const [formData, setFormData] = useState({
    performanceTitle: '',
    userId: userId,
    eventId: eventId,
    mediaType: 'file',
    videoLink: '',
    performanceFile: null,
    description: '',
    tags: [],
    competitionId: competiId,
  });

  const [tagInput, setTagInput] = useState('');
  const [currentFile, setCurrentFile] = useState('');
  
  const { getPerformanceById, isLoading } = usePerformanceAuth();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (performanceId) {
        try {
          const response = await getPerformanceById(performanceId);
          if (response.success && response.data) {
            const data = response.data;
            
            // Determine media type based on performanceFile or videoLink
            const mediaType = data.performanceFile ? 'file' : 'url';
            const videoLink = mediaType === 'url' ? data.performanceFile : '';
            
            setFormData({
              performanceTitle: data.performanceTitle || '',
              userId: data.userId || userId,
              eventId: data.eventId || eventId,
              competitionId: data.competitionId || competiId,
              description: data.description || '',
              tags: data.tags || [],
              mediaType: mediaType,
              videoLink: videoLink,
              performanceFile: null // Reset file input
            });
            
            // Store current file URL for display
            if (data.performanceFile && mediaType === 'file') {
              setCurrentFile(data.performanceFile);
            }
          }
        } catch (error) {
          console.error('Error fetching performance:', error);
        }
      }
    };

    fetchPerformanceData();
  }, [performanceId, eventId, userId, competiId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        performanceFile: file,
        videoLink: '', // Clear video link when file is selected
        mediaType: 'file'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for submission
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'tags') {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else if (key === 'performanceFile' && formData[key]) {
        submissionData.append(key, formData[key]);
      } else if (key !== 'performanceFile') {
        submissionData.append(key, formData[key]);
      }
    });

    onSubmit(submissionData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {performanceId ? 'Update Performance' : 'New Performance'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Performance Title
          </label>
          <input
            type="text"
            required
            value={formData.performanceTitle}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, performanceTitle: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your performance title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Method
          </label>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="file"
                checked={formData.mediaType === 'file'}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    mediaType: e.target.value,
                    videoLink: ''
                  }))
                }
                className="mr-2"
              />
              Upload File
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="url"
                checked={formData.mediaType === 'url'}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    mediaType: e.target.value,
                    performanceFile: null
                  }))
                }
                className="mr-2"
              />
              Provide URL
            </label>
          </div>

          {formData.mediaType === 'file' ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-purple-600 hover:text-purple-700"
              >
                Click to upload
              </label>
              {currentFile && !formData.performanceFile && (
                <p className="text-sm text-gray-500 mt-2">
                  Current file: {currentFile}
                </p>
              )}
              {formData.performanceFile && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected file: {formData.performanceFile.name}
                </p>
              )}
            </div>
          ) : (
            <input
              type="url"
              value={formData.videoLink}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, videoLink: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter video/audio URL"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Describe your performance"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add tags"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-purple-500 hover:text-purple-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {performanceId ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerformanceForm;