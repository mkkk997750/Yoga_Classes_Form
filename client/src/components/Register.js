// components/Register.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let isValid = true;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Please enter your name' }));
      isValid = false;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter your email' }));
      isValid = false;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Please enter your password' }));
      isValid = false;
    }
    if (!age) {
      setErrors((prev) => ({ ...prev, age: 'Please enter your age' }));
      isValid = false;
    }
    if (!batch) {
      setErrors((prev) => ({ ...prev, batch: 'Please enter your batch' }));
      isValid = false;
    }
    if (!date || !selectedMonth) {
      setErrors((prev) => ({ ...prev, date: 'Please enter your date of birth' }));
      isValid = false;
    }

    if (isValid) {
      const formattedDate = `${date} ${selectedMonth}`;
      axios
        .post('/api/register', { name, email, password, age, batch, dob: formattedDate })
        .then((res) => setResponse(res.data))
        .catch((err) => setErrors(err.response.data));
    }
  };

  useEffect(() => {
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    }
  }, [response, navigate]);

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
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
          <label htmlFor="age">Age</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
          {errors.batch && <span className="error">{errors.batch}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="" disabled>
              Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
