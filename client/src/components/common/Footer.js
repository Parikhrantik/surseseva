import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for the latest events and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 px-6 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button className="w-full sm:w-auto px-8 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <span>Subscribe</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Event<span className="text-purple-500">Vote</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your premier platform for discovering and voting on amazing events worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Event Categories</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/events/music" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Music Events
                </Link>
              </li>
              <li>
                <Link to="/events/tech" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Tech Events
                </Link>
              </li>
              <li>
                <Link to="/events/sports" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Sports Events
                </Link>
              </li>
              <li>
                <Link to="/events/art" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Art & Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                <span>123 Event Street, NY 10001</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-purple-500" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-purple-500" />
                <span>info@eventvote.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Globe className="h-5 w-5 mr-3 text-purple-500" />
                <span>www.eventvote.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EventVote. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;