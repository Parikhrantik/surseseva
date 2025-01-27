import React from 'react';
import { Users, Calendar, Award, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
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
          <div className="space-y-8 text-lg leading-relaxed" style={{ textAlign: 'justify' }} >
            <p className="text-white/90">
              Sur Se Seva is a non-profit New Jersey entity, an Art and Musicloving community that is dedicated to promoting and empowering
              the arts in all its forms. Music and Aart are gifts from God and have the power to heal and unite people across cultures, Language,
              Religions and Borders. We strive to use these gifts to serve our community through Seva (Selfless Service). Our foundation, Sur Se Seva
              (SSS), is committed to organizing events and performances that showcase various forms of art and craft. While our primary
              focus is music, we also aim to promote dance, painting, theater, drama, poetry, literature, comedy, spirituality, and more.
            </p>

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
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-center animate-fadeIn">
            <h1 className="text-lg font-medium text-white" style={{ fontFamily: 'cursive', fontSize: '2.0rem', marginTop: '10px' }}>
              <span className="font-normal">Founder:</span>
              <br />
            </h1>
            <h2 className="text-lg font-medium text-white" style={{ fontFamily: 'cursive', fontSize: '2.0rem', marginTop: '12px' }}>
              <span className="font-bold-text-4xl  "> Rantik Parikh</span></h2>
          </div>
        </div>


        {/* commented code */}
        {/* <div
          className="address_section absolute bottom-10 left-1/2 transform -translate-x-1/2 address-tab pb-12 grid grid-cols-3 gap-6 items-center px-12 text-white"
          style={{ zIndex: 10 }}
        >
          <div className="animate-fadeIn text-left">
            <h1 className="text-lg font-medium flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-white-500" />
              <span>P.O. Box 4514, Warren, NJ 07059</span>
            </h1>
            <h2 className="text-lg font-medium flex items-center mt-2">
              <Phone className="h-5 w-5 mr-3 text-white-500" />
              <span>+91 732-803-1119</span>
            </h2>
          </div>

          <div className="animate-fadeIn text-center">
            <h1
              className="text-lg font-medium"
              style={{ fontFamily: "cursive", fontSize: "1.8rem" }}
            >
              <span className="font-normal">Founder:</span>
            </h1>
            <h2
              className="text-lg font-medium mt-4"
              style={{ fontFamily: "cursive", fontSize: "2.0rem" }}
            >
              <span className="font-bold text-4xl">Rantik Parikh</span>
            </h2>
          </div>

          <div className="animate-fadeIn text-right">
            <h2 className="text-lg font-medium flex items-center">
              <Mail className="h-5 w-5 mr-3 text-white-500" />
              <span>
                For any details related to SurSeSeva,
                <br />
                Email us: surseseva@gmail.com
              </span>
            </h2>
          </div>
        </div> */}

      </div >
      {/* <div className="address-tab pb-12">
        <div className="text-center animate-fadeIn">
          <h1 className="text-lg font-medium text-white">
            <MapPin className="h-5 w-5 mr-3 text-white-500" style={{ fontFamily: 'cursive', fontSize: '2.0rem', marginTop: '12px', marginLeft: '16px' }} />
            <span>P.O. Box 4514, Warren. NJ 07059</span>
            <br />
          </h1>
          <h2> <Phone className="h-5 w-5 mr-3 text-white-500" style={{ fontFamily: 'cursive', fontSize: '2.0rem', marginLeft: '16px' }} />
            <span>+91 732-803-1119</span></h2>
          <h2>  <Mail className="h-5 w-5 mr-3 text-white-500" style={{ fontFamily: 'cursive', fontSize: '2.0rem', marginLeft: '16px' }} />
            <span> For any details related to SurSeSeva,
              <br></br>
              Email us : surseseva@gmail.com</span></h2>
        </div>
      </div> */}

    </div>



    // <div className="min-h-screen bg-gray-50">
    //   {/* Hero Section */}
    //   <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 mt-10 " >
    //     <div className="container mx-auto px-4 text-center">
    //       <h1 className="text-4xl font-bold mb-4">About EventVote</h1>
    //       <p className="text-xl">Your trusted platform for event discovery and voting</p>
    //     </div>
    //   </div>

    //   {/* Mission Section */}
    //   <div className="container mx-auto px-4 py-12">
    //     <div className="max-w-3xl mx-auto">
    //       <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
    //       <p className="text-gray-600 text-lg mb-8">
    //         EventVote is dedicated to creating a vibrant community where event enthusiasts can discover, 
    //         share, and vote for their favorite events. We believe in the power of community-driven 
    //         content and aim to provide a platform that celebrates creativity and engagement.
    //       </p>
    //     </div>
    //   </div>

    //   {/* Features Section */}
    //   <div className="bg-white py-12">
    //     <div className="container mx-auto px-4">
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         <div className="text-center p-6">
    //           <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
    //           <p className="text-gray-600">Join our growing community of event enthusiasts</p>
    //         </div>
    //         <div className="text-center p-6">
    //           <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
    //           <p className="text-gray-600">New events added daily across various categories</p>
    //         </div>
    //         <div className="text-center p-6">
    //           <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
    //           <h3 className="text-xl font-semibold mb-2">Fair Voting</h3>
    //           <p className="text-gray-600">Transparent and secure voting system</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Team Section */}
    //   <div className="container mx-auto px-4 py-12">
    //     <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       <div className="bg-white p-6 rounded-lg shadow-md text-center">
    //         <img 
    //           src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150" 
    //           alt="Team Member" 
    //           className="w-24 h-24 rounded-full mx-auto mb-4"
    //         />
    //         <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
    //         <p className="text-gray-600">Founder & CEO</p>
    //       </div>
    //       <div className="bg-white p-6 rounded-lg shadow-md text-center">
    //         <img 
    //           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150" 
    //           alt="Team Member" 
    //           className="w-24 h-24 rounded-full mx-auto mb-4"
    //         />
    //         <h3 className="text-xl font-semibold mb-2">Mike Thompson</h3>
    //         <p className="text-gray-600">Technical Director</p>
    //       </div>
    //       <div className="bg-white p-6 rounded-lg shadow-md text-center">
    //         <img 
    //           src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150" 
    //           alt="Team Member" 
    //           className="w-24 h-24 rounded-full mx-auto mb-4"
    //         />
    //         <h3 className="text-xl font-semibold mb-2">Emily Chen</h3>
    //         <p className="text-gray-600">Community Manager</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default About;