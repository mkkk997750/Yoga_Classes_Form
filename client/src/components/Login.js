// components/Login.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // Define the state variables for the user input and validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Define the state variable for the API response
  const [response, setResponse] = useState(null);

  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Define a function to handle the form submission
  const handleSubmit = async (e) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Clear any previous errors
    setErrors({});

    // Validate the user input
    let isValid = true;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter your email' }));
      isValid = false;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Please enter your password' }));
      isValid = false;
    }

    // If the input is valid, make the API request
    if (isValid) {
      try {
        const res = await axios.post('/api/login', { email, password });
        // Set the response state
        setResponse(res.data);
      } catch (err) {
        // Set the error state
        setErrors(err.response.data);
      }
    }
  };

  // Use the useEffect hook to handle the API response
  useEffect(() => {
    // If the response is successful, store the user's token and data in the local storage
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect to the home page
      navigate('/');
    }
  }, [response, navigate]);

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
