// components/Navbar.js: This is the React component for the navigation bar

import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Get the user's token and data from the local storage
  const token = localStorage.getItem('token');
  //const user = JSON.parse(localStorage.getItem('user'));

  // Get the history object from React Router
  const history = useNavigate();

  // Define a function to handle the logout action
  const handleLogout = () => {
    // Clear the user's token and data from the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    history('/login');
  };

  return (
    <div className="navbar">
      <h1>Yoga Classes</h1>
      <ul>
        {token ? (
          // If the user is logged in, show the home and logout links
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          // If the user is not logged in, show the register and login links
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
