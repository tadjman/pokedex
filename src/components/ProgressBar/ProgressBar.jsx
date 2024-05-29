import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.module.css';

export const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  let bgColor;
  if (percentage > 50) {
    bgColor = 'bg-success'; // Color Green if + 50%
  } else if (percentage > 25) {
    bgColor = 'bg-warning'; // Color Orange if 25% >< 50%
  } else {
    bgColor = 'bg-danger'; // Color Red if - 25%
  }

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between">
        <span>{label}: {value}</span>
      </div>
      <div className="progress" style={{ height: '30px' }}>
        <div 
          className={`progress-bar ${bgColor}`} 
          role="progressbar" 
          style={{ width: `${percentage}%` }} 
          aria-valuenow={value} 
          aria-valuemin="0" 
          aria-valuemax={max}
        >
          
        </div>
      </div>
    </div>
  );
};
