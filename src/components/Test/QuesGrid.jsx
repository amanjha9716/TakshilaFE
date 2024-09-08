import React from 'react';
import './test.css';

export default function QuesGrid({ no, setQues, quesind, anslist }) {
  return (
    <div className="quesgrid"style={{cursor:'pointer'}}>
      {anslist.map((e, index) => (
        <div 
          key={index} 
          onClick={() => setQues(index)} 
          className={`grid-item ${e?.status}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
