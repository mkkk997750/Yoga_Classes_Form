import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register/*" element={<Register />} />
        <Route path="login/*" element={<Login />} />
        <Route path="pay/*" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
