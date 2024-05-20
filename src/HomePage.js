// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const redirectToMainPage = () => {
    navigate('/main');
  };
  const redirectToTicTacToe = () => {
    navigate('/tic-tac-toe');
  };

  

  return (
    <div className="homepage-container">
      <h3 className='heading'>🐍Slither into action with Rattlerun!</h3>
      <div className="button-container">
        <button onClick={redirectToMainPage}>Start Rattlerun</button>
        <button onClick={redirectToTicTacToe}>More Games</button>
        
      </div>
    </div>
  );
};

export default HomePage;

