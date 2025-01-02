import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/forms/LoginForm';
import RegistrationPage from './components/forms/RegistrationForm';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './components/layout/DashboardLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true); // Mock authentication for testing.

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgotpwd" element={<ForgotPasswordForm />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirect root to dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
