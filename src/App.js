import React, { useState } from 'react';
import './styles.css';
import Board from './Board';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');

  const handleScoreUpdate = ({ currentScore, highScore }) => {
    setCurrentScore(currentScore);
    setHighScore(highScore);
  };

  return (
    <div className="App">
      <h1>rattlerun</h1>
      <section className="score">
        <h3>SCOREBOARD🥳</h3>
        <p>Live result: {currentScore}<br/><br/>
         High Score: {highScore}</p>
      </section>
      
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
      
      <Board onScoreUpdate={handleScoreUpdate} difficulty={difficulty} />
    </div>
  );
}

export default App;
