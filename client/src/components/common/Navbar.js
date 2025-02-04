import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Bell, LogIn, LogOut, User, Calendar, Clock, History } from 'lucide-react';
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
    const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
    const role = localStorage.getItem('role');
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

    const handleEventDropdownClick = () => {
        setIsMobileEventsOpen(!isMobileEventsOpen);
    };

    const handleSignInClick = () => {

        // navigate('/login');
        navigate('/login', { replace: true });

    };

    const handleLogOutClick = () => {
        localStorage.clear()
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        // navigate('/login');
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

    // Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
                setIsMobileEventsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle mouse enter and leave for dropdown
    const handleDropdownMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownMouseLeave = () => {
        setIsDropdownOpen(false);
    };

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
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-2xl md:text-3xl font-bold">
                        <img className="h-8 md:h-12" src="/images/SurWhite.png" alt="Logo" />
                    </Link>

                    {isOpen && (
                        <div className="mobile-btn-items pt-4 px-4">
                            <button className="relative group">
                                <Bell className="h-6 w-6 hover:text-purple-500 transition-colors" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            {!isLoggedIn &&
                                <button
                                    className="text-whiteflex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
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
                                        // onMouseEnter={handleDropdownMouseEnter}
                                        // onMouseDown={handleDropdownMouseLeave}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-full text-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors nav-link flex items-center space-x-2"
                                    >
                                        <User className="h-4 w-4" />
                                        {participant.name}
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10 transform transition-all duration-300 ease-out"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        // onMouseLeave={handleDropdownMouseLeave}
                                        >
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
                                                    <p className="font-medium group-hover:text-purple-600">My Competitions</p>
                                                </div>                                 </Link>

                                            <hr className="my-2 border-gray-200" />
                                            <button
                                                className="flex items-center space-x-2 px-4 py-3 rounded-full  text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                                onClick={handleLogOutClick}                                 >
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
                    )}

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
                                <Link
                                    to="#allevents"
                                    className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const presentEventSection = document.getElementById('presentEvent-section');
                                        if (presentEventSection) {
                                            presentEventSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            navigate('/allevents');
                                        }
                                    }}>
                                    <span className="w-8">
                                        <Calendar className="h-5 w-5 " />
                                    </span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Present Events</p>
                                    </div>
                                </Link>
                                <Link
                                    to="#allevents"
                                    className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const pastEventSection = document.getElementById('pastEvent-section');
                                        if (pastEventSection) {
                                            pastEventSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            navigate('/allevents');
                                        }
                                    }}
                                >
                                    <span className="w-8">   <History className="h-5 w-5 " />  </span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Past Events</p>
                                    </div>
                                </Link>
                                <Link to="/events/sports" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
                                    <span className="w-8"><Clock className="h-5 w-5 " />  </span>
                                    <div>
                                        <p className="font-medium group-hover:text-purple-600">Future Events</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            className="relative group py-2"
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     const aboutSection = document.getElementById('about-section');
                        //     aboutSection.scrollIntoView({ behavior: 'smooth' });
                        // }}
                        >
                            <span className="hover:text-purple-500 transition-colors">About</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                        <Link
                            href="#competition-section"
                            className="relative group py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                const aboutSection = document.getElementById('competition-section');
                                aboutSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="hover:text-purple-500 transition-colors">Competitions</span>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    </div>

                    {/* Right Section - Desktop */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Notifications */}
                        {/* <button className="relative group">
                            <Bell className="h-6 w-6 hover:text-purple-500 transition-colors" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                3
                            </span>
                        </button> */}

                        {/* Auth Buttons */}
                        {!isLoggedIn &&

                            <button
                                className="text-white flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                onClick={handleSignInClick}
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                        }

                        {isLoggedIn ? (
                            <div className=" relative">
                                <button
                                    // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    onMouseEnter={handleDropdownMouseEnter}
                                    // onMouseLeave={handleDropdownMouseLeave}  // Show dropdown when mouse enters

                                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors nav-link flex items-center space-x-2"
                                >
                                    <User className="h-4 w-4" onMouseLeave={handleDropdownMouseLeave} />
                                    {participant.name}
                                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10 transform transition-all duration-300 ease-out"
                                        // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        onMouseEnter={handleDropdownMouseEnter}  
                                        onMouseLeave={handleDropdownMouseLeave}
                                    >
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
                                        >
                                            <User size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
                                            <div>
                                                <p className="font-medium group-hover:text-purple-600">My Profile</p>
                                            </div>
                                        </Link>
                                        {(role !== "Voter") && (
                                        <Link
                                            to="/my-competitions"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
                                        >
                                            <Calendar size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
                                            <div>
                                                <p className="font-medium group-hover:text-purple-600">My Competitions</p>
                                            </div>                                 </Link>


                                        )}
                                        <hr className="my-2 border-gray-200" />
                                        <button
                                            className="flex items-center space-x-2 px-4 py-3 rounded-full  text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                            onClick={handleLogOutClick}                                 >
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

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="toggle-menu lg:hidden p-2 hover:text-purple-500 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="mobile-menu lg:hidden py-4 bg-[#0a1851] rounded-b-lg">
                        <div className="flex flex-col space-y-2">
                            {/* Mobile Navigation Links */}
                            <Link to="/" className="px-4 py-2 hover:bg-purple-600/20 transition-colors">
                                Home
                            </Link>

                            {/* Mobile Events Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                                    // onClick={handleEventDropdownClick}
                                    className="w-full px-4 py-2 flex justify-between items-center hover:bg-purple-600/20 transition-colors"
                                >
                                    <span>Events</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${isMobileEventsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMobileEventsOpen && isMobileEventsOpen && (
                                    <div className="bg-[#0a1851]/50 py-2">
                                        <Link to="#allevents"
                                            className="block px-8 py-2 hover:bg-purple-600/20 transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const presentEventSection = document.getElementById('presentEvent-section');
                                                // presentEventSection.scrollIntoView({ behavior: 'smooth' });
                                                if (presentEventSection) {
                                                    presentEventSection.scrollIntoView({ behavior: 'smooth' });
                                                    setIsOpen(!isOpen)
                                                } else {
                                                    navigate('/allevents');
                                                    setIsOpen(!isOpen)
                                                }
                                            }}>
                                            <p className="font-medium group-hover:text-purple-600">Present Events</p>
                                        </Link>
                                        <Link to="#allevents" className="block px-8 py-2 hover:bg-purple-600/20 transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const pastEventSection = document.getElementById('pastEvent-section');
                                                if (pastEventSection) {
                                                    pastEventSection.scrollIntoView({ behavior: 'smooth' });
                                                    setIsOpen(!isOpen)
                                                } else {
                                                    navigate('/allevents');
                                                    setIsOpen(!isOpen)
                                                }
                                            }}>
                                            <p className="font-medium group-hover:text-purple-600">Past Events</p>
                                        </Link>
                                        <Link to="/events/sports" className="block px-8 py-2 hover:bg-purple-600/20 transition-colors">
                                            <p className="font-medium group-hover:text-purple-600">Future Events</p>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
              to="/about"
              className="px-4 py-2 hover:bg-purple-600/20 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              About
            </Link>
            <Link
              to="/competitions"
              className="px-4 py-2 hover:bg-purple-600/20 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              Competitions
            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>

        // old code
        //  <header
        //     className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        //         ? 'bg-gradient-to-r from-[#0a1851] to-[#1f2a63] text-white shadow-lg'
        //         : isHomePage
        //             ? 'bg-transparent text-white'
        //             : 'bg-gradient-to-r from-[#0a1851] to-[#1f2a63] text-white'
        //         }`}
        // >
        //     <nav className="container mx-auto px-4">
        //         <div className="flex justify-between items-center py-4">
        //             <Link
        //                 to="/"
        //                 className="flex items-center space-x-2 text-3xl font-bold"
        //             >
        //                 <img className="h-12" src="/images/SurWhite.png" alt="Logo" />
        //             </Link>
        //             {/* Desktop Navigation */}
        //             <div className="hidden lg:flex items-center space-x-8">
        //                 <Link
        //                     to="/"
        //                     className="relative group py-2"
        //                 >
        //                     <span className="hover:text-purple-500 transition-colors">Home</span>
        //                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        //                 </Link>

        //                 <div className="relative group">
        //                     <button className="flex items-center space-x-1 py-2">
        //                         <span className="hover:text-purple-500 transition-colors">Events</span>
        //                         <ChevronDown className="h-4 w-4 group-hover:text-purple-500 transition-colors" />
        //                     </button>
        //                     <div className="absolute top-full -left-4 w-64 bg-white rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        //                         <div className="px-4 py-2 border-b border-gray-100">
        //                             <p className="text-sm font-medium text-gray-500">Event Categories</p>
        //                         </div>
        //                         <Link to="/events/music" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group"
        //                         >
        //                             <span className="w-8">🎵</span>
        //                             <div>
        //                                 <p className="font-medium group-hover:text-purple-600">Present Events</p>
        //                                 {/* <p className="text-sm text-gray-500">Live concerts & festivals</p> */}
        //                             </div>
        //                         </Link>
        //                         <Link to="/events/tech" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
        //                             <span className="w-8">💻</span>
        //                             <div>
        //                                 <p className="font-medium group-hover:text-purple-600">Past  Events</p>
        //                                 {/* <p className="text-sm text-gray-500">Conferences & workshops</p> */}
        //                             </div>
        //                         </Link>
        //                         <Link to="/events/sports" className="flex items-center px-6 py-3 hover:bg-purple-50 text-gray-700 group">
        //                             <span className="w-8">⚽</span>
        //                             <div>
        //                                 <p className="font-medium group-hover:text-purple-600">Future Events</p>
        //                                 {/* <p className="text-sm text-gray-500">Games & tournaments</p> */}
        //                             </div>
        //                         </Link>

        //                     </div>
        //                 </div>

        //                 <Link
        //                     href="#about-section"
        //                     className="relative group py-2"
        //                     onClick={(e) => {
        //                         e.preventDefault();
        //                         const aboutSection = document.getElementById('about-section');
        //                         aboutSection.scrollIntoView({ behavior: 'smooth' });
        //                     }}
        //                 >
        //                     <span className="hover:text-purple-500 transition-colors">About</span>
        //                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        //                 </Link>
        //                 <Link
        //                     href="#competition-section"
        //                     className="relative group py-2"
        //                     onClick={(e) => {
        //                         e.preventDefault();
        //                         const aboutSection = document.getElementById('competition-section');
        //                         aboutSection.scrollIntoView({ behavior: 'smooth' });
        //                     }}
        //                 >
        //                     <span className="hover:text-purple-500 transition-colors">Competitions</span>
        //                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        //                 </Link>
        //             </div>

        //             {/* Right Section */}
        //             <div className="hidden lg:flex items-center space-x-6">
        //                 <div className="relative">
        //                     <input
        //                         type="text"
        //                         placeholder="Search events..."
        //                         className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-300 transition-all"
        //                     />
        //                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        //                 </div>

        //                 <button className="relative group">
        //                     <Bell className="h-6 w-6 hover:text-purple-500 transition-colors" />
        //                     <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
        //                         3
        //                     </span>
        //                 </button>

        //                 {!isLoggedIn &&

        //                     <button
        //                         className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
        //                         onClick={handleSignInClick}
        //                     >
        //                         <LogIn className="h-4 w-4" />
        //                         <span>Sign In</span>
        //                     </button>
        //                 }

        //                 {isLoggedIn ? (
        //                     <div className=" relative">
        //                         <button
        //                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        //                             className="flex items-center space-x-2 px-4 py-2 rounded-full text-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors nav-link flex items-center space-x-2"
        //                         >
        //                             <User className="h-4 w-4" />
        //                             {participant.name}
        //                             <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        //                         </button>

        //                         {isDropdownOpen && (
        //                             <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10 transform transition-all duration-300 ease-out" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        //                                 <Link
        //                                     to="/profile"
        //                                     className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
        //                                 >
        //                                     <User size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
        //                                     <div>
        //                                         <p className="font-medium group-hover:text-purple-600">My Profile</p>
        //                                     </div>
        //                                 </Link>
        //                                 <Link
        //                                     to="/my-competitions"
        //                                     className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 group"
        //                                 >
        //                                     <Calendar size={16} className="mr-3 text-gray-400 group-hover:text-purple-500" />
        //                                     <div>
        //                                         <p className="font-medium group-hover:text-purple-600">My Competitions</p>
        //                                     </div>
        //                                 </Link>

        //                                 <hr className="my-2 border-gray-200" />
        //                                 <button
        //                                     className="flex items-center space-x-2 px-4 py-3 rounded-full  text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
        //                                     onClick={handleLogOutClick}
        //                                 >
        //                                     <LogOut className="h-4 w-4" />
        //                                     <span>Logout</span>
        //                                 </button>
        //                             </div>
        //                         )}
        //                     </div>
        //                 ) : (
        //                     ""
        //                 )}
        //             </div>

        //             {/* Mobile menu button */}
        //             <button
        //                 onClick={() => setIsOpen(!isOpen)}
        //                 className="lg:hidden hover:text-purple-500 transition-colors"
        //             >
        //                 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        //             </button>
        //         </div>

        //         {/* Mobile Navigation */}
        //         {isOpen && (
        //             <div className="lg:hidden py-4" style={{ backgroundColor: '#0a1851' }}>
        //                 <div className="flex flex-col space-y-4">
        //                     <Link to="/" className="py-2 hover:text-purple-500 transition-colors">
        //                         Home
        //                     </Link>
        //                     <Link to="/events/music" className="py-2 hover:text-purple-500 transition-colors">
        //                         Present Events
        //                     </Link>

        //                     <Link to="/events/tech" className="py-2 hover:text-purple-500 transition-colors">
        //                         past Events
        //                     </Link>
        //                     <Link to="/events/sports" className="py-2 hover:text-purple-500 transition-colors">
        //                         Future Events
        //                     </Link>
        //                     <Link to="/about" className="py-2 hover:text-purple-500 transition-colors">
        //                         About Us
        //                     </Link>

        //                     <div className="pt-4 border-t border-gray-200">
        //                         <input
        //                             type="text"
        //                             placeholder="Search events..."
        //                             className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100"
        //                         />
        //                     </div>

        //                     {isLoggedIn ? (
        //                         <button
        //                             className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        //                             onClick={handleLogOutClick}
        //                         >
        //                             Logout
        //                         </button>
        //                     ) : (
        //                         <button
        //                             className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        //                             onClick={handleSignInClick}
        //                         >
        //                             Sign In
        //                         </button>
        //                     )}
        //                 </div>
        //             </div>
        //         )}

        //     </nav>
        // </header>

    );
};

export default Header;


