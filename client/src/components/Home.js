import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  const handlePay = () => {
    history('/pay');
  };

  return (
    <div className="home">
      {token ? (
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
            <button onClick={handlePay}>Pay Now</button>
          )}
        </>
      ) : (
        <p>Please login or register to enroll for the yoga classes</p>
      )}
    </div>
  );
};

export default Home;
