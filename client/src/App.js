import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';

import "./App.css";

function App() {
  ReactDOM.render(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="register/*" element={<Register/>} />
        <Route path="login/*" element={<Login/>} />
        <Route path="pay/*" element={<Payment/>} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

export default App;