import React from 'react';

const Food = ({ food }) => {
  return (
    <div className="food" style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }}></div>
  );
}

export default Food;
