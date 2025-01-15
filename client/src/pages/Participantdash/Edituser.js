import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useParticipantsAuth from '../../hooks/useParticipantsAuth';


const EditUser = () => {
  const { id } = useParams();
  const { participant, setId, handleSubmit, loading } = useParticipantsAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate(); // You may need this for navigation after successful update

  // Set the participant ID when the component mounts
  useEffect(() => {
    setId(id); // Set the ID to fetch user details
  }, [id, setId]);

  // Update local state when participant data is fetched
  useEffect(() => {
    if (participant && participant._id === id) {
      setUserData(participant); // Populate form with fetched data
    }
  }, [participant, id]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form
        onSubmit={(e) => handleSubmit(e, userData)} // Pass e and userData
        className="bg-white shadow-md rounded-lg p-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
