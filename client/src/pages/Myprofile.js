import React, { useState, useEffect } from 'react';
import { Edit2, Camera, Briefcase, Link as LinkIcon, Twitter, Instagram, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useParticipantsAuth from '../hooks/useParticipantsAuth';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

export default function Myprofile() {
  const id = localStorage.getItem('userId');
  const { participant, setId, loading, updateUser } = useParticipantsAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tempProfilePicture, setTempProfilePicture] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    role: '',
    profilePicture: null,
    bio: '',
    genrePreferences: [],
    contactInfo: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  useEffect(() => {
    if (participant && participant._id === id) {
      setUserData(participant);
    }
  }, [participant, id, isEditing]);

  // Handle form submission
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...userData,
        ...data, // Merge form data with existing userData
      };
      debugger
      const res = await updateUser(id, updatedData);
      debugger
      if (res.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        navigate('/profile');


      }
      // navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle file change (for profile picture)
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempProfilePicture(url);
      debugger
      setUserData((prev) => ({
        ...prev,
        profilePicture: file, // Store the file
      }));
    }
  };


  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile Info */}
              <div className="md:w-1/3">
                <div className="relative">
                  {tempProfilePicture ? (
                    <img
                      src={tempProfilePicture}
                      alt="Profile"
                      className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg mx-auto md:mx-0"
                    />
                  ) : (

                    <img
                      src={userData.profilePicture || '/images/default-avatar.png'}

                      alt="Profile"
                      className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg mx-auto md:mx-0"
                    />
                  )
                  }
                  {isEditing && (
                    <>
                      <label
                        htmlFor="profilePictureInput"
                        className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors cursor-pointer"
                      >
                        <Camera size={20} />
                      </label>
                      <input
                        id="profilePictureInput"
                        // src={userData.profilePicture}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User size={18} />
                    <span>{participant.role}</span>
                  </div>
                </div>
                {/* <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    <Instagram size={20} />
                  </a>
                </div> */}
              </div>

              {/* Right Column - Main Content */}
              <div className="md:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{participant.name}</h1>
                    <span className="mt-2 text-gray-600"><Mail size={16} className="inline-block mr-2" />{participant.email}</span>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      <Edit2 size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{participant.stats?.eventsCreated || 0}</div>
                    <div className="text-sm text-gray-600">Participated Competition</div>
                  </div>
                  <div className="bg-pink-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">{participant.stats?.attendees || 0}</div>
                    <div className="text-sm text-gray-600">Total Attendees</div>
                  </div>
                  <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{participant.stats?.rating || 0}</div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    {/* Bio */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm">Name</label>
                      <input
                        {...register("name")}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-sm">Bio/About Me</label>
                      <textarea
                        {...register("bio", {
                          required: "Bio is required",
                          minLength: { value: 10, message: "Bio must be at least 10 characters" },
                        })}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm"
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      />
                      {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
                    </div>

                    {/* Genre Preferences */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm">Singing Genre Preferences</label>
                      <Select
                        options={[
                          { value: 'Pop', label: 'Pop' },
                          { value: 'Rock', label: 'Rock' },
                          { value: 'Jazz', label: 'Jazz' },
                          { value: 'Classical', label: 'Classical' },
                          { value: 'Hip-hop', label: 'Hip-hop' },
                        ]}
                        isMulti
                        value={userData.genrePreferences.map((genre) => ({ value: genre, label: genre }))}
                        onChange={(options) =>
                          setUserData({ ...userData, genrePreferences: options.map((option) => option.value) })
                        }
                      />
                    </div>

                    {/* Contact Info */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm">Contact Information</label>
                      <input
                        {...register("contactInfo")}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm"
                        value={userData.contactInfo}
                        onChange={(e) => setUserData({ ...userData, contactInfo: e.target.value })}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-100 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <><div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900">Bio/About Me</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">{participant.bio || "No bio available."}</p>
                  </div>
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-gray-900">Singing Genre Preferences</h2>
                      <p className="mt-4 text-gray-600 leading-relaxed">{participant.genrePreferences || "No bio available."}</p>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                      <p className="mt-4 text-gray-600 leading-relaxed">{participant.contactInfo || "No bio available."}</p>
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

