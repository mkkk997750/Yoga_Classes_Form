// components/Home.js: This is the React component for the home page

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Get the user's token and data from the local storage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Get the history object from React Router
  const history = useNavigate();

  // Define a function to handle the payment button click
  const handlePay = () => {
    // Redirect to the payment page
    history('/pay');
  };

  return (
    <div className="home">
      {token ? (
        // If the user is logged in, show the user's name, batch, and payment status
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Your batch is {user.batch}</p>
          <p>
            Your payment status is{' '}
            {user.payment ? (
              <span className="paid">Paid</span>
            ) : (
              <span className="unpaid">Unpaid</span>
            )}
          </p>
          {!user.payment && (
            // If the user has not paid, show the payment button
            <button onClick={handlePay}>Pay Now</button>
          )}
        </>
      ) : (
        // If the user is not logged in, show a message to login or register
        <p>Please login or register to enroll for the yoga classes</p>
      )}
    </div>
  );
};

export default Home;
