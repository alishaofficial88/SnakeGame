// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import App from './App';
import HomePage from './HomePage';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes> {/* Wrap your Route components with Routes */}
      <Route exact path="/" element={<HomePage />} /> {/* Use 'element' prop to render components */}
      <Route path="/main" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);




