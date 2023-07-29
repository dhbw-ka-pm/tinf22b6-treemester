import React, { useState } from 'react';

const ToolsTooltip = ({ isVisible, message }) => {
  const tooltipStyle = {
    display: isVisible ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: "red",
    color: 'white', 
    padding: '8px',
    borderRadius: '4px',
    zIndex: 1,
    left: '750px',
};

  return (
    <div style={tooltipStyle}>
      {message}
    </div>
  );
};

export default ToolsTooltip;
