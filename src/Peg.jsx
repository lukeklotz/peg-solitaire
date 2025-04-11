import React from 'react';
import './Peg.css';

const Peg = ({ color, draggable, onDragStart }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: color,
        margin: 'auto'
      }}
    ></div>
  );
};

export default Peg;
