import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Search,
  Play,
  Sparkles
} from 'lucide-react';
import EventCard from '../components/common/Cards/EventCard';
import events from "../utils/events.json"
import CompetitionEvents from './CompetitionEvents';
import usePresentEventApi from '../hooks/presentEvent';
import { useLocation, useNavigate } from 'react-router-dom';
// import MissionPage from './MissionPage';
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const featuredEvents = events.slice(0, 3)
  const navigate = useNavigate();
  const location = useLocation();


  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllEvents } = usePresentEventApi();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents);  // Store events in state
        setLoading(false);  // Set loading state to false after events are fetched
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        setError('Failed to load events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = events.slice(0, 9)

  const handleView = (id) => {
    navigate(`/events_details/${id}`);
  };


  const handleViewAllClick = () => {
    // setShowAllEvents(true); 
    if (location.pathname !== '/allevents') {
      navigate('/allevents');
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle between showing full text and a single paragraph
  };

  console.log(featuredEvents)
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
        <div className="hero-section relative container mx-auto px-4 text-center" id="about-section">
          {/* Floating Badge */}
          <div className="inline-block animate-bounce mb-8">
            <div className="mission-btn bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Mission</span>
              </div>

            </div>
          </div>

          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>
            Sur and Sangeet is a Gift of God
          </h1>

          {/* Glass Search Bar */}
          {/* <div className="max-w-3xl mx-auto mb-12">
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
          </div> */}

          {/* Scrolling Categories */}
          {/* <div className="flex justify-center gap-4 mb-12">
            {['All', 'Music', 'Tech', 'Sports', 'Arts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 ${selectedCategory === cat.toLowerCase()
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 hover:bg-white/10 backdrop-blur-lg'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div> */}

          {/* Floating Stats */}
          {/* <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
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
          </div> */}

          {/* <div className="inline-block animate-bounce mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Mission</span>
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Sur and Sangeet is a Gift of God
          </h1> */}

          {/* Main Content */}
          {/* <div className="container mx-auto px-4 max-w-4xl"> */}
          {/* Title Section */}
          {/* <div className="text-center mb-8" style={{paddingTop:"4rem"}}>
                <h1 className="text-yellow-300 text-2xl font-semibold mb-4">
                  Mission
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent" 
                style={{fontFamily: 'cursive'}}
                >
                Sur and Sangeet is a Gift of God
                </h2>
              </div> */}


          {/* Main Content */}
          <div className="space-y-8 text-lg leading-relaxed" style={{ textAlign: 'justify' }} >
            <p className="text-white/90">
              Sur Se Seva is a non-profit New Jersey entity, an Art and Musicloving community that is dedicated to promoting and empowering
              the arts in all its forms. Music and Aart are gifts from God and have the power to heal and unite people across cultures, Language,
              Religions and Borders. We strive to use these gifts to serve our community through Seva (Selfless Service). Our foundation, Sur Se Seva
              (SSS), is committed to organizing events and performances that showcase various forms of art and craft. While our primary
              focus is music, we also aim to promote dance, painting, theater, drama, poetry, literature, comedy, spirituality, and more.
            </p>

            {isExpanded && (
              <>

                <p className="text-white/90 mt-2">
                  When we organize an event, after covering all expenses associated with the event, any surplus funds that we generate are donated
                  back to the community thru our Non-Profit Sur Se Seva Foundation. This will ensure that any charitable cause in the community
                  that requires our assistance can benefit from the resources generated through our events and performances. Our sole purpose is
                  to use Sur (or any other form of Indian art and craft) to do Seva and to give back to the community, both locally and internationally.
                </p>

                <p className="text-white/90">
                  Our events and performances are not just a showcase of talent but a celebration of diversity and inclusivity. We believe that
                  everyone has something unique to offer, and our community is a platform where all voices can be heard. We are committed to
                  promoting emerging artists and providing them with opportunities to showcase their talent. We believe that by nurturing young
                  artists, we can create a community that is passionate about the arts and committed to promoting them. Working together, we can
                  make a difference in the world and create a more harmonious and beautiful society.
                </p>

                <p className="text-white/90">
                  We invite all music and art lovers from USA and beyond to join us in celebrating the beauty of the arts. Whether you're a musician,
                  dancer, artist, poet, or simply a music enthusiast, there's a place for you in our community. So, join us in celebrating the beauty of
                  the arts and the power of Sur Seva. Let us come together to create a world where art and music are celebrated, respected, and
                  valued. Click on the link below to become a member and join our Elite and most happening music and art group.
                </p>
              </>
            )}
            <button onClick={toggleReadMore} class="px-2 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r
             from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25"> {isExpanded ? 'Show Less' : 'Read More'}</button>

          </div>
          {/* </div> */}

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      <CompetitionEvents />
      {/* Present Events Section */}
      <div className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Present Events</h2>
              <p className="text-white/60">Discover the most exciting  experiences</p>
            </div>
            <button onClick={handleViewAllClick} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* {featuredEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))} */}
            {events.length > 0 ? (
              events
                .filter(event => event.eventType === null || event.eventType === 'present').slice(0, 4) // Limit to the first 4 events// Filter events with eventType null or present
                .map(event => (
                  <EventCard
                    key={event._id} // Adding a unique key for each component
                    id={event._id}
                    bannerImage={event.bannerImage}
                    title={event.title}
                    handleView={handleView}
                  />
                ))
            ) : (
              <p>No events available.</p>
            )}
            {featuredEvents.length > 0 ? (
              featuredEvents.map(event => (
                <EventCard
                  // key={event.id}
                  id={event._id}
                  bannerImage={event.bannerImage}
                  title={event.title}
                  handleView={handleView}

                />
              ))
            ) : (
              <p>
                {/* Loading events... */}
                No data Found
              </p> // Show loading text until the events are fetched
            )}

          </div>

        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Past Events</h2>
              <p className="text-white/60">Discover the most exciting  experiences</p>
            </div>
            <button onClick={handleViewAllClick} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* {featuredEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))} */}
            {events.length > 0 ? (
              events
                .filter(event => event.eventType === 'past').slice(0, 4) // Limit to the first 4 events// Filter events with eventType null or present
                .map(event => (
                  <EventCard
                    key={event._id} // Adding a unique key for each component
                    id={event._id}
                    bannerImage={event.bannerImage}
                    title={event.title}
                    handleView={handleView}
                  />
                ))
            ) : (
              <p>No events available.</p>
            )}

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
            <button className="demo-btn px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all transform hover:-translate-y-1">
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