// Payment.js: This is the React component for the payment form

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const Payment = () => {
  // Define the state variables for the user input and validation
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState(500);
  const [errors, setErrors] = useState({});

  // Define the state variable for the card details
  const [card, setCard] = useState({
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: ''
  });

  // Define the state variable for the UPI ID
  const [upi, setUPI] = useState('');

  // Define the state variable for the Paypal ID
  const [paypal, setPaypal] = useState('');

  // Define the state variable for the API response
  const [response, setResponse] = useState(null);

  // Get the history object from React Router
  const history = useNavigate();

  let isValid = true;

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Clear any previous errors
    setErrors({});

    // Validate the user input
    if (!method) {
      setErrors((prev) => ({ ...prev, method: 'Please select a payment method' }));
      isValid = false;
    }
    if (!amount) {
      setErrors((prev) => ({ ...prev, amount: 'Please enter the payment amount' }));
      isValid = false;
    } else if (amount !== 500) {
      setErrors((prev) => ({ ...prev, amount: 'Invalid payment amount' }));
      isValid = false;
    }

    // Validate the card details if the method is card
    if (method === 'card') {
  // You can use validator or any other module to validate the input
  // For example, validator.isCreditCard(card.number)
  // Check if the card number is a valid credit card number
    if (!validator.isCreditCard(card.number)) {
    // Set the error state for the card number
    setErrors((prev) => ({ ...prev, number: 'Invalid card number' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the expiry month is a valid month number
  if (!validator.isInt(card.exp_month, { min: 1, max: 12 })) {
    // Set the error state for the expiry month
    setErrors((prev) => ({ ...prev, exp_month: 'Invalid expiry month' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the expiry year is a valid year number
  if (!validator.isInt(card.exp_year, { min: 2021, max: 2030 })) {
    // Set the error state for the expiry year
    setErrors((prev) => ({ ...prev, exp_year: 'Invalid expiry year' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the cvc is a valid cvc number
  if (!validator.isInt(card.cvc, { min: 100, max: 999 })) {
    // Set the error state for the cvc
    setErrors((prev) => ({ ...prev, cvc: 'Invalid cvc' }));
    // Set the validity flag to false
    isValid = false;
  }
}

// Validate the UPI ID if the method is upi
if (method === 'upi') {
  // You can use validator or any other module to validate the input
  // For example, validator.isUPI(upi)
  // Check if the UPI ID is a valid UPI ID
  if (!validator.isUPI(upi)) {
    // Set the error state for the UPI ID
    setErrors((prev) => ({ ...prev, upi: 'Invalid UPI ID' }));
    // Set the validity flag to false
    isValid = false;
  }
}

// Validate the Paypal ID if the method is paypal
if (method === 'paypal') {
  // You can use validator or any other module to validate the input
  // For example, validator.isEmail(paypal)
  // Check if the Paypal ID is a valid email address
  if (!validator.isEmail(paypal)) {
    // Set the error state for the Paypal ID
    setErrors((prev) => ({ ...prev, paypal: 'Invalid Paypal ID' }));
    // Set the validity flag to false
    isValid = false;
  }
}


    // If the input is valid, make the API request
    if (isValid) {
      // Get the user's token from the local storage
      const token = localStorage.getItem('token');

      // Get the payment details based on the method
      let details;
      if (method === 'card') {
        details = card;
      } else if (method === 'upi') {
        details = upi;
      } else if (method === 'paypal') {
        details = paypal;
      }

      axios
        .post('/api/pay', { token, method, amount, details })
        .then((res) => {
          // Set the response state
          setResponse(res.data);
        })
        .catch((err) => {
          // Set the error state
          setErrors(err.response.data);
        });
    }
  };

  // Use the useEffect hook to handle the API response
  useEffect(() => {
    // If the response is successful, redirect to the home page
    if (response) {
      history.push('/');
    }
  }, [response, history]);

  // Define the function to handle the card input change
  // let isValid=true;
const handleCardChange = (e) => {
  // Update the card state with the user input
  setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Validate the card input and show any errors
  // You can use validator or any other module to validate the input
  // For example, validator.isCreditCard(card.number)
  // Check if the card number is a valid credit card number
  if (!validator.isCreditCard(card.number)) {
    // Set the error state for the card number
    setErrors((prev) => ({ ...prev, number: 'Invalid card number' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the expiry month is a valid month number
  if (!validator.isInt(card.exp_month, { min: 1, max: 12 })) {
    // Set the error state for the expiry month
    setErrors((prev) => ({ ...prev, exp_month: 'Invalid expiry month' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the expiry year is a valid year number
  if (!validator.isInt(card.exp_year, { min: 2021, max: 2030 })) {
    // Set the error state for the expiry year
    setErrors((prev) => ({ ...prev, exp_year: 'Invalid expiry year' }));
    // Set the validity flag to false
    isValid = false;
  }
  // Check if the cvc is a valid cvc number
  if (!validator.isInt(card.cvc, { min: 100, max: 999 })) {
    // Set the error state for the cvc
    setErrors((prev) => ({ ...prev, cvc: 'Invalid cvc' }));
    // Set the validity flag to false
    isValid = false;
  }
};

// Define the function to handle the UPI input change
const handleUPIChange = (e) => {
  // Update the UPI state with the user input
  setUPI(e.target.value);

  // Validate the UPI input and show any errors
  // You can use validator or any other module to validate the input
  // For example, validator.isUPI(upi)
  // Check if the UPI ID is a valid UPI ID
  if (!validator.isUPI(upi)) {
    // Set the error state for the UPI ID
    setErrors((prev) => ({ ...prev, upi: 'Invalid UPI ID' }));
    // Set the validity flag to false
    isValid = false;
  }
};

// Define the function to handle the Paypal input change
const handlePaypalChange = (e) => {
  // Update the Paypal state with the user input
  setPaypal(e.target.value);

  // Validate the Paypal input and show any errors
  // You can use validator or any other module to validate the input
  // For example, validator.isEmail(paypal)
  // Check if the Paypal ID is a valid email address
  if (!validator.isEmail(paypal)) {
    // Set the error state for the Paypal ID
    setErrors((prev) => ({ ...prev, paypal: 'Invalid Paypal ID' }));
    // Set the validity flag to false
    isValid = false;
  }
};


  return (
    <div className="payment">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="method">Payment Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="">Select a payment method</option>
            <option value="card">Card</option>
            <option value="paypal">Paypal</option>
            <option value="upi">UPI</option>
          </select>
          {errors.method && <span className="error">{errors.method}</span>}
        </div>
        {method === 'card' && (
          // If the user selects card, show the card input fields
          <div className="card-form">
            <div className="form-group">
              <label htmlFor="number">Card Number</label>
              <input
                type="text"
                id="number"
                name="number"
                value={card.number}
                onChange={handleCardChange}
              />
              {errors.number && <span className="error">{errors.number}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="exp_month">Expiry Month</label>
              <input
                type="text"
                id="exp_month"
                name="exp_month"
                value={card.exp_month}
                onChange={handleCardChange}
              />
              {errors.exp_month && (
                <span className="error">{errors.exp_month}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exp_year">Expiry Year</label>
              <input
                type="text"
                id="exp_year"
                name="exp_year"
                value={card.exp_year}
                onChange={handleCardChange}
              />
              {errors.exp_year && (
                <span className="error">{errors.exp_year}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={card.cvc}
                onChange={handleCardChange}
              />
              {errors.cvc && <span className="error">{errors.cvc}</span>}
            </div>
          </div>
        )}
        {method === 'upi' && (
          // If the user selects upi, show the UPI input field
          <div className="upi-form">
            <div className="form-group">
              <label htmlFor="upi">UPI ID</label>
              <input
                type="text"
                id="upi"
                value={upi}
                onChange={handleUPIChange}
              />
              {errors.upi && <span className="error">{errors.upi}</span>}
            </div>
          </div>
        )}
        {method === 'paypal' && (
          // If the user selects paypal, show the Paypal input field
          <div className="paypal-form">
            <div className="form-group">
              <label htmlFor="paypal">Paypal ID</label>
              <input
                type="text"
                id="paypal"
                value={paypal}
                onChange={handlePaypalChange}
              />
              {errors.paypal && <span className="error">{errors.paypal}</span>}
            </div>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="amount">Payment Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            readOnly
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Pay</button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
