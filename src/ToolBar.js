import React, { useState } from 'react';
import Tools from './Tools';
import Circle from './Circle';

const ToolBar = () => {
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);

  const createCircle = ({ color, size, text }) => {
    const newCircle = {
      id: circles.length + 1,
      color,
      size,
      text,
    };
    setCircles([...circles, newCircle]);
  };

  const handleCircleSelect = (id) => {
    setSelectedCircle(id);
  };

  const handleCircleDeselect = () => {
    setSelectedCircle(null);
  };

  const handleCircleTransform = (id, newSize) => {
    const updatedCircles = circles.map((circle) => {
      if (circle.id === id) {
        return { ...circle, size: newSize };
      }
      return circle;
    });
    setCircles(updatedCircles);
  };

  return (
    <>
      <Tools/>
    </>
    ); 
};

/*
createCircle={createCircle}
        <div className="tools" onClick={handleCircleDeselect}>
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              id={circle.id}
              color={circle.color}
              size={circle.size}
              text={circle.text}
              isSelected={circle.id === selectedCircle}
              onSelect={handleCircleSelect}
              onDeselect={handleCircleDeselect}
              onTransform={handleCircleTransform}
            />
          ))}
        </div>
*/
export default ToolBar;