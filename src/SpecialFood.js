import React from 'react';
import './styles.css'
const SpecialFood = ({ specialFood }) => {
  return (
    <div className="special-food" style={{ left: `${specialFood.x * 20}px`, top: `${specialFood.y * 20}px` }}>
      
    </div>
  );
}

export default SpecialFood;

