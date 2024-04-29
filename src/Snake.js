import React from 'react';
import './styles.css';

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
        ></div>
      ))}
    </>
  );
}

export default Snake;


