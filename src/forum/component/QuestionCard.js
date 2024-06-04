import React from 'react';

const QuestionCard = ({ name, content, createdAt }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{name}</h5>
        <p className="card-date">Created at: {createdAt}</p>
      </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default QuestionCard;