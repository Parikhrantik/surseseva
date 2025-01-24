import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Bell, LogIn, LogOut, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import useParticipantsAuth from '../../hooks/useParticipantsAuth';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const id = localStorage.getItem('userId');
    const isHomePage = window.location.pathname === '/';

    const { setId, loading, participant } = useParticipantsAuth();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSignInClick = () => {

        navigate('/login');

    };

    const handleLogOutClick = () => {
        localStorage.clear()
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);
    useEffect(() => {
        if (id) {
            setId(id);
        }
    }, [id, setId]);

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-gradient-to-r from-[#0a1851] to-[#1f2a63] text-white shadow-lg'
                : isHomePage
                    ? 'bg-transparent text-white'
                    : 'bg-gradient-to-r from-[#0a1851] to-[#1f2a63] text-white'
                }`}
        >
            <nav className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-3xl font-bold"
                    >
                        <img className="h-12" src="/images/SurWhite.png" alt="Logo" />
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="relative group py-2"
                        >
                            <span className="hover:text-purple-500 transition-colors">Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>

                        <div className="relative group">
                            <button className="flex items-center space-x-1 py-2">
                                <span className="hover:text-purple-500 transition-colors">Events</span>
                                <ChevronDown className="h-4 w-4 group-hover:text-purple-500 transition-colors" />
                            </button>
                            <div className="absolute top-full -left-4 w-64 bg-white rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-500">Event Categories</p>
                                </div>
                                <Link to="/events/music" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
                                    <span className="w-8">🎵</span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Music Events</p>
                                        <p className="text-sm text-gray-500">Live concerts & festivals</p>
                                    </div>
                                </Link>
                                <Link to="/events/tech" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
                                    <span className="w-8">💻</span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Tech Events</p>
                                        <p className="text-sm text-gray-500">Conferences & workshops</p>
                                    </div>
                                </Link>
                                <Link to="/events/sports" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
                                    <span className="w-8">⚽</span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Sports Events</p>
                                        <p className="text-sm text-gray-500">Games & tournaments</p>
                                    </div>
                                </Link>
                                <Link to="/events/art" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
                                    <span className="w-8">🎨</span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Art & Culture</p>
                                        <p className="text-sm text-gray-500">Exhibitions & shows</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Link
                            to="/about"
                            className="relative group py-2"
                        >
                            <span className="hover:text-purple-500 transition-colors">About</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-300 transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        <button className="relative group">
                            <Bell className="h-6 w-6 hover:text-purple-500 transition-colors" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {!isLoggedIn &&

                            <button
                                className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                onClick={handleSignInClick}
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                        }

                        {isLoggedIn ? (
                            <div className=" relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors nav-link flex items-center space-x-2"
                                >
                                    <User className="h-4 w-4" />
                                    {participant.name}
                                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10 transform transition-all duration-300 ease-out" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
                                        >
                                            <User size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
                                            <div>
                                                <p className="font-medium group-hover:text-purple-600">My Profile</p>
                                            </div>
                                        </Link>
                                        <Link
                                            to="/my-competitions"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
                                        >
                                            <Calendar size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
                                            <div>
                                                <p className="font-medium group-hover:text-purple-600">Competitions</p>
                                            </div>
                                        </Link>

                                        <hr className="my-2 border-gray-200" />
                                        <button
                                            className="flex items-center space-x-2 px-4 py-3 rounded-full  text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                            onClick={handleLogOutClick}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden hover:text-purple-500 transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden py-4" style={{ backgroundColor: '#0a1851' }}>
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="py-2 hover:text-purple-500 transition-colors">
                                Home
                            </Link>
                            <Link to="/events/music" className="py-2 hover:text-purple-500 transition-colors">
                                Music Events
                            </Link>
                            <Link to="/events/tech" className="py-2 hover:text-purple-500 transition-colors">
                                Tech Events
                            </Link>
                            <Link to="/events/sports" className="py-2 hover:text-purple-500 transition-colors">
                                Sports Events
                            </Link>
                            <Link to="/about" className="py-2 hover:text-purple-500 transition-colors">
                                About Us
                            </Link>

                            <div className="pt-4 border-t border-gray-200">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100"
                                />
                            </div>

                            {isLoggedIn ? (
                                <button
                                    className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    onClick={handleLogOutClick}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    onClick={handleSignInClick}
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </nav>
        </header>
    );
};

export default Header;

