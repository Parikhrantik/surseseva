import React, { use, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './components/forms/LoginForm';
import RegistrationPage from './components/forms/RegistrationForm';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Myevents from './pages/Myevents';
import Myprofile from './pages/Myprofile';
import CompetitionEventsDetails from './pages/CompetitionEventsDetails';
import MyCompetitions from './pages/MyCompetitions';
import ParticipantCompetitionDetails from './pages/participantCompetitionDetails';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Public Route wrapper component to redirect authenticated users
  const PublicRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
  };

  // Conditionally render Navbar and Footer
  const ConditionalLayout = ({ children }) => {
    const location = useLocation();
    const showLayout =
      ["/", "/about", "/events", "/profile", "/my-competitions"].includes(location.pathname) ||
      location.pathname.startsWith("/competition-events-details") || location.pathname.startsWith("/competition-details");

    return (
      <>
        {showLayout && <Navbar />}
        <main className="flex-grow">{children}</main>
        {showLayout && <Footer />}
      </>
    );
  };
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <ConditionalLayout>
                <Home />
              </ConditionalLayout>
            }
          />
          <Route
            path="/about"
            element={
              <ConditionalLayout>
                <About />
              </ConditionalLayout>
            }
          />
          <Route
            path="/events"
            element={
              <ConditionalLayout>
                <Myevents />
              </ConditionalLayout>
            }
          />
          <Route
            path="/my-competitions"
            element={
              <ConditionalLayout>
                <MyCompetitions />
              </ConditionalLayout>
            }
          />
          <Route
            path="/competition-events-details/:id"
            element={
              <ConditionalLayout>
                <CompetitionEventsDetails />
              </ConditionalLayout>
            }
          />
          <Route
            path="/competition-details/:id"
            element={
              <ConditionalLayout>
                <ParticipantCompetitionDetails />
              </ConditionalLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <ConditionalLayout>
                <ProtectedRoute>
                  <Myprofile />
                </ProtectedRoute>
              </ConditionalLayout>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotpwd"
            element={
              <PublicRoute>
                <ForgotPasswordForm />
              </PublicRoute>
            }
          />

          {/* Protected Dashboard Routes */}
          {/* <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          /> */}

          {/* Catch all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
