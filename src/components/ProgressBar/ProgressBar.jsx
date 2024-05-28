import React from 'react';
import './ProgressBar.module.css';

export const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="progress-bar">
      <label>{label}</label>
      <div className="progress">
        <div className="progress-value" style={{ width: `${percentage}%` }}>
          {value}
        </div>
      </div>
    </div>
  );
};