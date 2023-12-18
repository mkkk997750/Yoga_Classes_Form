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

  const history = useNavigate();

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
    } else if (age < 18 || age > 65) {
      setErrors((prev) => ({ ...prev, age: 'Age limit is 18-65' }));
      isValid = false;
    }
    if (!batch) {
      setErrors((prev) => ({ ...prev, batch: 'Please select a batch' }));
      isValid = false;
    }
    if (!date) {
      setErrors((prev) => ({ ...prev, date: 'Please enter your date' }));
      isValid = false;
    }
    if (!selectedMonth) {
      setErrors((prev) => ({ ...prev, month: 'Please select a month' }));
      isValid = false;
    } else if (parseInt(selectedMonth, 10) < 1 || parseInt(selectedMonth, 10) > 12) {
      setErrors((prev) => ({ ...prev, month: 'Month should be between 1 and 12' }));
      isValid = false;
    }

    if (isValid) {
      axios
        .post('/api/register', { name, email, password, age, batch, date, month: selectedMonth })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setErrors(err.response.data);
        });
    }
  };

  useEffect(() => {
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      history('/');
    }
  }, [response, history]);

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <select
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">Select a batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
          {errors.batch && <span className="error">{errors.batch}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="month">Month</label>
          <input
            type="text"
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          {errors.month && <span className="error">{errors.month}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
