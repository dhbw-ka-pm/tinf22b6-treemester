import React, { useState, useEffect } from 'react';
import {List, ListItem, ListItemText, Checkbox, Popover} from '@mui/material';

function SprintlineDrawer({xmlDocument}) {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (xmlDocument) {
    
      const labelElements = xmlDocument.getElementsByTagName('label');
      const labelsArr = extractLabelsFromXml(labelElements);
      setLabels(labelsArr);
    }
  }, [xmlDocument]);

  const extractLabelsFromXml = (labelElements) => {
    const labelsArr = [];
    for (let i = 0; i < labelElements.length; i++) {
      const labelName = labelElements[i].textContent;
      labelsArr.push({ name: labelName });
    }
    return labelsArr;
  };

  return (
    <>
      <button onClick={handleOpenDrawer}>Sprintline</button>
      <Popover anchor="left" open={open} onClose={handleCloseDrawer} style={{ marginTop: '125px', marginBottom: '20px' }}>
        <List>
          {labels.map((label, index) => (
            <ListItem key={index}>
              <Checkbox />
              <ListItemText primary={label.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default SprintlineDrawer;
