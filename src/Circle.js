import React, { useState } from 'react';

const Circle = ({ id, color, size, text, isSelected, onSelect, onDeselect, onTransform }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    if (isSelected) {
      if (e.target.classList.contains('circle')) {
        setDragging(true);
      } else if (e.target.classList.contains('resizer')) {
        setResizing(true);
      }
    } else {
      onSelect(id);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newX = position.x + e.movementX;
      const newY = position.y + e.movementY;
      setPosition({ x: newX, y: newY });
    } else if (resizing) {
      const newSize = size + e.movementX;
      onTransform(id, newSize);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <svg
      className={`circle ${isSelected ? 'selected' : ''}`}
      width={size}
      height={size}
      x={position.x}
      y={position.y}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff">
        {text}
      </text>
      {isSelected && (
        <>
          <circle className="resizer" cx={size} cy={size} r={5} fill="#ffffff" />
          <circle className="resizer" cx={size} cy={0} r={5} fill="#ffffff" />
          <circle className="resizer" cx={0} cy={size} r={5} fill="#ffffff" />
        </>
      )}
    </svg>
  );
};

export default Circle;