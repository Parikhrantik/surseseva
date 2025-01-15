/*************  ✨ Codeium Command 🌟  *************/
import React from 'react';
import { Calendar, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import EventCard from '../components/common/Cards/EventCard';
import events from "../utils/events.json"

const Home = () => {
  const featuredEvents = events.slice(0, 3);
 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover & Vote for Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Join our community of event enthusiasts and help choose the next big thing!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                Explore Events
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Submit Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Events Listed' },
              { value: '50K+', label: 'Active Users' },
              { value: '100K+', label: 'Votes Cast' },
              { value: '20+', label: 'Categories' },
            ].map((stat, index) => (
              <div className="text-center" key={index}>
                <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-gray-600">Discover the most exciting upcoming events</p>
          </div>
          <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
            <span>View All</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-purple-600" />,
                title: 'Music Events',
                description: 'Concerts, festivals, and live performances',
              },
              {
                icon: <Sparkles className="h-8 w-8 text-pink-600" />,
                title: 'Tech Events',
                description: 'Conferences, workshops, and hackathons',
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                title: 'Sports Events',
                description: 'Tournaments, matches, and championships',
              },
              {
                icon: <Calendar className="h-8 w-8 text-green-600" />,
                title: 'Art & Culture',
                description: 'Exhibitions, theater, and performances',
              },
            ].map((category, index) => (
              <div
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                key={index}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Browse Events →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Host Your Event?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of event organizers who trust EventVote
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

