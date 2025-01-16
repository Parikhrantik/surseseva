import React, { useState } from 'react';
import { 
  Calendar, 
  Star,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Search,
  Heart,
  Share2,
  Play,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import EventCard from '../components/common/Cards/EventCard';
import events from "../utils/events.json"
import MissionPage from './MissionPage';
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const featuredEvents = events.slice(0, 3)
 
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Ultra Modern Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-900 to-blue-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse -top-40 -left-20"></div>
          <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-40 right-0"></div>
          <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-0 left-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center">
          {/* Floating Badge */}
          <div className="inline-block animate-bounce mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Experience The Future of Events</span>
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Discover Epic Events
          </h1>

          {/* Glass Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-white/40" />
                  <input 
                    type="text"
                    placeholder="Search your next experience..."
                    className="w-full bg-white/5 text-white placeholder-white/40 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Scrolling Categories */}
          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Music', 'Tech', 'Sports', 'Arts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                  selectedCategory === cat.toLowerCase()
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 hover:bg-white/10 backdrop-blur-lg'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Active Events', value: '2.5K+' },
              { label: 'Happy Users', value: '150K+' },
              { label: 'Total Reviews', value: '45K+' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* <MissionPage/> */}
      {/* Featured Events Section */}
      <div className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
              <p className="text-white/60">Discover the most exciting upcoming experiences</p>
            </div>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
         
        </div>
      </div>

      {/* Trending Section with 3D Cards */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-sm mb-4">
              <Star className="h-4 w-4 inline mr-2 text-yellow-400" />
              Hot & Trending
            </span>
            <h2 className="text-4xl font-bold">Most Popular Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      #{item}
                    </div>
                  </div>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                    Trending
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3">Tech Conference 2025</h3>
                <p className="text-white/60 text-sm mb-4">The biggest tech event of the year</p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-white/60">1.2k interested</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 bg-gradient-to-b from-purple-900/20 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse -top-40 -right-20"></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-0 left-20"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-block px-6 py-2 bg-white/5 backdrop-blur-lg rounded-full text-sm mb-8">
            🎉 Join 50,000+ Event Creators
          </span>
          
          <h2 className="text-5xl font-bold mb-8">Create Your Own Event</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Join the future of event hosting and reach millions of potential attendees
          </p>

          <div className="flex justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium hover:opacity-90 transition-opacity transform hover:-translate-y-1">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all transform hover:-translate-y-1">
              <Play className="h-5 w-5 inline mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;