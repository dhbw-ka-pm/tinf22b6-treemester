import React, { useState } from 'react';

const Tools = ({ createCircle }) => {
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(50);
  const [text, setText] = useState('');

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateCircle = () => {
    createCircle({ color, size, text });
  };

  return (
    <div>
      <p>
      <label>
        Color: &nbsp;
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
      </p>
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