// src/components/ProgressBar/ProgressBar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.module.css';

export const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  let bgColor;
  if (percentage > 50) {
    bgColor = 'bg-success'; // Vert
  } else if (percentage > 25) {
    bgColor = 'bg-warning'; // Orange
  } else {
    bgColor = 'bg-danger'; // Rouge
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
          <span className="progress-bar-text" style={{ color: '#fff', fontWeight: 'bold' }}>{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};
