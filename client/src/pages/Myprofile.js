import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, MapPin, Calendar, Edit2, Camera, Briefcase, Link as LinkIcon, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useParticipantsAuth from '../hooks/useParticipantsAuth';

export default function Myprofile() {
  const id = localStorage.getItem('userId');
  const { participant, setId, loading, handleSubmit: handleAuthSubmit } = useParticipantsAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [userData, setUserData] = useState({
    profilePicture: '',
    bio: '',
    genrePreferences: [],
    contactInfo: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  useEffect(() => {
    if (participant && participant._id === id) {
      setValue('bio', participant.bio);
      setValue('genrePreferences', participant.genrePreferences);
      setValue('contactInfo', participant.contactInfo);
      setUserData(participant);
    }
  }, [participant, id, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prev) => ({ ...prev, profilePicture: file }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        profilePicture: userData.profilePicture
      };
      await handleAuthSubmit(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile Info */}
              <div className="md:w-1/3">
                <div className="relative flex justify-center items-center">
                  <img
                    src={userData.profilePicture ? URL.createObjectURL(userData.profilePicture) : '../../public/images/avatar.png'}
                    alt="Profile"
                    className="w-40 h-40 rounded-lg border-4 border-white shadow-xl object-cover transform hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 mb-4 mr-4">
                      <label className="cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center border-4 border-white transform hover:scale-110 transition-all duration-300 ease-in-out">
                          <Camera size={24} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>






                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Briefcase size={18} />
                    <span>{participant.role}</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* Right Column - Main Content */}
              <div className="md:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{participant.name}</h1>
                    <p className="mt-2 text-gray-600">{participant.email}</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700 transition-all"
                    >
                      <Edit2 size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="bg-purple-50 rounded-xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {participant.stats?.eventsCreated || 0}
                    </div>
                    <div className="text-sm text-gray-600">Events Created</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-pink-600">
                      {participant.stats?.attendees || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Attendees</div>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-indigo-600">
                      {participant.stats?.rating || 0}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    {/* Bio/About Me */}
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium text-sm">Bio/About Me</label>
                      <textarea
                        {...register("bio", { required: "Bio is required", minLength: { value: 10, message: "Bio must be at least 10 characters" } })}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-3 text-sm"
                      />
                      {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
                    </div>


                    {/* Singing Genre Preferences */}
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium text-sm">Singing Genre Preferences</label>
                      <select
                        {...register("genrePreferences", { required: "Please select a genre" })}
                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-3 text-sm"
                      >
                        <option value="">Select a Genre</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Classical">Classical</option>
                        <option value="Hip-hop">Hip-hop</option>
                      </select>
                      {errors.genrePreferences && <span className="text-red-500 text-xs">{errors.genrePreferences.message}</span>}
                    </div>


                    {/* Contact Information */}
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium text-sm">Contact Information (Optional)</label>
                      <input
                        type="text"
                        {...register("contactInfo")}
                        placeholder="Phone number or preferred contact method"
                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none px-4 py-3 text-sm"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700 transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-200 text-gray-700 font-semibold rounded-lg px-6 py-3 hover:bg-gray-300 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                ) : (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900">About</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">{participant.bio}</p>
                    {participant.genrePreferences?.length > 0 && (
                      <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-900">Genre Preferences</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {participant.genrePreferences.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
