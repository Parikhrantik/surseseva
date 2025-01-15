import React from 'react';
import { Users, Calendar, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About EventVote</h1>
          <p className="text-xl">Your trusted platform for event discovery and voting</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-8">
            EventVote is dedicated to creating a vibrant community where event enthusiasts can discover, 
            share, and vote for their favorite events. We believe in the power of community-driven 
            content and aim to provide a platform that celebrates creativity and engagement.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Join our growing community of event enthusiasts</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
              <p className="text-gray-600">New events added daily across various categories</p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fair Voting</h3>
              <p className="text-gray-600">Transparent and secure voting system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150" 
              alt="Team Member" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150" 
              alt="Team Member" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Mike Thompson</h3>
            <p className="text-gray-600">Technical Director</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150" 
              alt="Team Member" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Emily Chen</h3>
            <p className="text-gray-600">Community Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;