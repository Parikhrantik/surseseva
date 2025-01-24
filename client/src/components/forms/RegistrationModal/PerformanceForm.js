import React, { useEffect, useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthToken, Role } from '../../../utils/constants';
const PerformanceForm = ({ onSubmit, onBack, onClose, competitionId, competitionData }) => {


  // const API_URL = process.env.LIVE_BASE_URL || 'http://localhost:5000';
  const API_URL = process.env.BASE_URL || 'http://34.122.208.248/node';
  const competitionRegId = competitionData._id;
  const userid = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    performanceTitle: '',
    userId: userid,
    competitionId: competitionId,
    mediaType: 'file',
    videoLink: '',
    description: '',
    tags: [],
    performanceFile: null,
    uploadProgress: 0,
  });
  const [loading, setLoading] = useState(false);


  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const submissionData = new FormData(); // Create FormData instance
    submissionData.append('userId', userid);
    submissionData.append('competitionId', competitionId);
    submissionData.append('competitionRegId', competitionRegId);
    submissionData.append('performanceTitle', formData.performanceTitle);
    submissionData.append('description', formData.description);
    submissionData.append('tags', JSON.stringify(formData.tags));
    // Append the file or URL based on media type
    if (formData.mediaType === 'file' && formData.performanceFile) {
      submissionData.append('performanceFile', formData.performanceFile); // Attach file
    } else if (formData.mediaType === 'url') {
      submissionData.append('videoLink', formData.videoLink);
    }
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${AuthToken}` || localStorage.getItem('authToken'),
          'role': Role || localStorage.getItem('role'),
        },
      };
      const response = await axios.post(`${API_URL}/performance/submit-performance`, submissionData, config);
      console.log(response.data, 'comp000000'); // Debug response
      toast.success(response.data?.message);
      setLoading(false);
      navigate("/my-competitions")
    } catch (err) {
      setLoading(false);
      setError('Submission failed. Please try again.');
      console.error(err);
      toast.error(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 100) {
        setError("File size should be less than 100MB");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        performanceFile: file,
        uploadProgress: 0,
      }));
      setError(null);

      // Simulating file upload progress
      simulateUploadProgress();
    }
  };

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
      } else {
        progress += 10;
        setFormData((prevData) => ({ ...prevData, uploadProgress: progress }));
      }
    }, 500);
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  useEffect(() => {
    console.log('formData', formData);
  }, [formData, Error]);

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md" style={{ color: "black" }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Performance Details</h2>
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
        <div >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Performance Title
          </label>
          <input
            type="text"
            required
            value={formData.performanceTitle}
            onChange={(e) =>
              setFormData({ ...formData, performanceTitle: e.target.value })
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
            <label className="flex items-center" style={{ color: "black" }}>
              <input
                type="radio"
                value="file"
                checked={formData.mediaType === 'file'}
                onChange={(e) =>
                  setFormData({ ...formData, mediaType: e.target.value, videoLink: '' })
                }
                className="mr-2"
              />
              Upload File
            </label>
            <label className="flex items-center" style={{ color: "black" }}>
              <input
                type="radio"
                value="url"
                checked={formData.mediaType === 'url'}
                onChange={(e) =>
                  setFormData({ ...formData, mediaType: e.target.value, performanceFile: null })
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

              {formData.performanceFile && (
                <p className="text-sm text-gray-500 mt-2">
                  {formData.performanceFile.name}
                </p>
              )}

              {formData.uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Progress:</span>
                    <span className="text-sm text-gray-500">
                      {formData.uploadProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div
                      className="bg-purple-500 h-2 rounded"
                      style={{ width: `${formData.uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <input
              type="url"
              value={formData.videoLink}
              onChange={(e) =>
                setFormData({ ...formData, videoLink: e.target.value })
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
              setFormData({ ...formData, description: e.target.value })
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
            {formData?.tags?.map((tag) => (
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

        <div className="flex justify-end space-x-4">
          {!loading &&
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
          }
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerformanceForm;
