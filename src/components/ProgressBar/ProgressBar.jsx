// src/components/ProgressBar/ProgressBar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.module.css';

export const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  let bgColor;
  if (percentage > 50) {
    bgColor = 'bg-success'; // Vert si ya plus de 50ù des stats
  } else if (percentage > 25) {
    bgColor = 'bg-warning'; // Orange si ya moins de 50% des stats
  } else {
    bgColor = 'bg-danger'; // Rouge si moins de 25% des stats
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
