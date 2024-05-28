import React from 'react';
import './Review.module.css';

export const Review = ({ author, content }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">{content}</p>
        <footer className="blockquote-footer">{author}</footer>
      </div>
    </div>
  );
};
