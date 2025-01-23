import React, { useState } from 'react';
import { Users, Calendar, Award } from 'lucide-react';
import useContactSupport from '../hooks/useContactSupport';

const ContactUs = () => {
    const { submitTicket, isLoading, ticketDetails } = useContactSupport();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    description: '',
  });
   
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitTicket(formData);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Support</h1>
          <p className="text-xl">We’re here to help you with your issues or concerns</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Submit a Support Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Issue Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Issue Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
                required
              >
                <option value="">Select an issue category</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Billing">Billing</option>
                <option value="Account Management">Account Management</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description of Issue</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your issue in detail"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90"
              >
                Submit Request
              </button>
            </div>
          </form>
          {ticketDetails && (
        <div className="mt-6 text-center">
          <p className="text-green-600 font-medium">
            Ticket created successfully! Ticket Number: {ticketDetails.ticketNumber}
          </p>
        </div>
      )}
        </div>
      </div>

   
    </div>
    
  );
};

export default ContactUs;
