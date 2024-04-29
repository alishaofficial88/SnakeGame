import React, { useState, useEffect, useCallback } from 'react';
import Snake from './Snake';
import Food from './Food';
import SpecialFood from './SpecialFood';
import './styles.css';

import eatSound from './apple-munch-40169.mp3';
import collideSound from './boing-6222.mp3';
import victorySound from './bonus-points-190035.mp3'; // Import victory sound

const Board = ({ onScoreUpdate }) => {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [specialFood, setSpecialFood] = useState(null);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const storedHighScore = localStorage.getItem('highScore');
    return storedHighScore ? parseInt(storedHighScore) : 0;
  });
  const [gamePaused, setGamePaused] = useState(false);
  const [eatAudio] = useState(new Audio(eatSound));
  const [collideAudio] = useState(new Audio(collideSound));
  const [victoryAudio] = useState(new Audio(victorySound)); // Create audio instance for victory sound
  const [difficulty, setDifficulty] = useState('Easy');
  const [playCollisionSound, setPlayCollisionSound] = useState(false);

  useEffect(() => {
    eatAudio.load();
    collideAudio.load();
    victoryAudio.load(); // Load victory sound
  }, [eatAudio, collideAudio, victoryAudio]);

  const playEatSound = useCallback(() => {
    eatAudio.currentTime = 0;
    eatAudio.play();
  }, [eatAudio]);

  const playCollideSound = useCallback(() => {
    collideAudio.currentTime = 0;
    collideAudio.play();
  }, [collideAudio]);

  const playVictorySound = useCallback(() => {
    victoryAudio.currentTime = 0;
    victoryAudio.play();
  }, [victoryAudio]);

  useEffect(() => {
    if (gameStarted && playCollisionSound) {
      playCollideSound();
    }
  }, [gameStarted, playCollisionSound, playCollideSound]);

  useEffect(() => {
    if (gameStarted && specialFood) {
      playVictorySound(); // Play victory sound when special food is eaten
    }
  }, [gameStarted, specialFood, playVictorySound]);

  useEffect(() => {
    if (gameStarted) {
      const handleKeyPress = (event) => {
        if (!gameOver) {
          switch (event.key) {
            case 'ArrowUp':
              setDirection('UP');
              break;
            case 'ArrowDown':
              setDirection('DOWN');
              break;
            case 'ArrowLeft':
              setDirection('LEFT');
              break;
            case 'ArrowRight':
              setDirection('RIGHT');
              break;
            case ' ':
              setGamePaused(prevPaused => !prevPaused);
              break;
            default:
              break;
          }
        }
      };

      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    let intervalDuration = 100;
    if (difficulty === 'Medium') {
      intervalDuration = 75;
    } else if (difficulty === 'Hard') {
      intervalDuration = 50;
    }

    if (gameStarted) {
      const moveSnake = setInterval(() => {
        if (!gamePaused) {
          const newSnake = [...snake];
          let newHead = { ...newSnake[0] };

          switch (direction) {
            case 'UP':
              newHead.y -= 1;
              break;
            case 'DOWN':
              newHead.y += 1;
              break;
            case 'LEFT':
              newHead.x -= 1;
              break;
            case 'RIGHT':
              newHead.x += 1;
              break;
            default:
              break;
          }

          if (specialFood && newHead.x === specialFood.x && newHead.y === specialFood.y) {
            setScore(prevScore => prevScore + 5);
            setSpecialFood(null);
            setHighScore(prevHighScore => {
              const newHighScore = Math.max(prevHighScore, score + 5);
              localStorage.setItem('highScore', newHighScore.toString());
              return newHighScore;
            });
            onScoreUpdate({ currentScore: score + 5, highScore: highScore + 5 });
            playVictorySound(); // Play victory sound
          } else if (newHead.x === food.x && newHead.y === food.y) {
            setScore(prevScore => {
              const newScore = prevScore + 1;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('highScore', newScore.toString());
              }
              playEatSound();
              return newScore;
            });
            generateFood();
            onScoreUpdate({ currentScore: score + 1, highScore });
          } else if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20 || checkCollision(newHead, newSnake)) {
            setGameOver(true);
            clearInterval(moveSnake);
            setPlayCollisionSound(true);
            return;
          } else {
            newSnake.pop();
            onScoreUpdate({ currentScore: score, highScore });
          }

          newSnake.unshift(newHead);
          setSnake(newSnake);
        }
      }, intervalDuration);

      return () => clearInterval(moveSnake);
    }
  }, [snake, direction, food, gameStarted, gameOver, highScore, onScoreUpdate, score, gamePaused, playEatSound, playVictorySound, playCollideSound, difficulty, specialFood]);

  const checkCollision = (head, snake) => {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  };

  const generateFood = () => {
    const isSpecialFood = Math.random() < 0.5;
    const newFood = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    };
    setFood(newFood);
    if (isSpecialFood) {
      const newSpecialFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      };
      setSpecialFood(newSpecialFood);
    }
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setSpecialFood(null);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGamePaused(false);
    setPlayCollisionSound(false);
    // Note: We don't reset high score here
    onScoreUpdate({ currentScore: 0, highScore }); // Update onScoreUpdate with score and high score
  };

  const startGame = () => {
    setGameStarted(true);
    resetGame();
    setHighScore(0);
  };

  return (
    <div className="board">
      {(gameOver || !gameStarted) && (
        <div className="difficulty">
          <label>
            Difficulty:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>
      )}
      {!gameStarted ? (
        <div className="overlay">
          <h2>Snake Game</h2>
          <h3 className='insturction'>Press spacebar to pause/resume.</h3>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <Snake snake={snake} />
          {specialFood && <SpecialFood specialFood={specialFood} />}
          <Food food={food} />
          {gameOver && (
            <div className="overlay">
              <h2>Game Over!</h2>
              <button onClick={resetGame}>Restart Game</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Board;
