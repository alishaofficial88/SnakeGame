// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or authentication state
    // For example, remove tokens from localStorage or cookies
    localStorage.removeItem('authToken');

    // Navigate the user back to the HomePage
    navigate('/');
  };

  return (
    <div>
      <h1>Are you sure you want to logout?</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
