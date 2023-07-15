import React, { useState, useRef } from 'react';
import * as d3 from 'd3';

const Tools = () => {
  const [size, setSize] = useState(50);
  const [text, setText] = useState('');

  const [activeCircle, setActiveCircle] = useState();

  const svgRef = useRef(null);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddCircle = (newCircle) => {
  };

  const handleCreateCircle = () => {
    const existingIds = activeCircle.children.map(child => child.id); // Duplicate prevention
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    const newCircle = {
      id: newId,
      name: text,
      size: size,
      children: []
    };
    handleAddCircle(newCircle);
  };


  return (
    <div>
      <p>
        <label>
          Size: &nbsp;
          <input type="number" value={size} onChange={handleSizeChange} />
        </label>
      </p>
      <p>
        <label>
          Text: &nbsp;
          <input type="text" value={text} onChange={handleTextChange} />
        </label>
      </p>
      <button onClick={handleCreateCircle}>Create Circle</button>
    </div>
  );
};

export default Tools;
