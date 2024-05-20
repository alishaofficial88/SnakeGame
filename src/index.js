// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import App from './App';
import HomePage from './HomePage';
import TicTacToe from './TicTacToe'; // Import the TicTacToe component

import './index.css';

ReactDOM.render(
  <Router>
    <Routes> {/* Wrap your Route components with Routes */}
      <Route exact path="/" element={<HomePage />} /> {/* Use 'element' prop to render components */}
      <Route path="/main" element={<App />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} /> {/* Add route for Tic Tac Toe game */}
    </Routes>
  </Router>,
  document.getElementById('root')
);




