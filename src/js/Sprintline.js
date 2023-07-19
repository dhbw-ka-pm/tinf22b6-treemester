import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Checkbox, Popover, IconButton, SvgIcon} from '@mui/material';

import { padding } from '@mui/system';

function SprintlineDrawer() {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  function CloseButtonIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="public\close-button.svg" />
      </SvgIcon>
    );
  }

  return (
    <>
      <button onClick={handleOpenDrawer}>Sprintline</button>
      <Popover anchor="left" open={open} onClose={handleCloseDrawer} style={{ marginTop: '125px', marginBottom: '20px' }}>
      <IconButton onClick={handleCloseDrawer} style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <CloseButtonIcon />
        </IconButton>
        <List>
          <ListItem>
          <Checkbox />
            <ListItemText primary="Sortieralgorithmen" />
          </ListItem>
          <ListItem style={{ paddingLeft: '20px' }}>
            <Checkbox />
            <ListItemText primary="Bubble Sort" />
          </ListItem>
          <ListItem style={{ paddingLeft: '20px' }}>
            <Checkbox />
            <ListItemText primary="Insertion Sort" />
          </ListItem>
          <ListItem style={{ paddingLeft: '20px' }}>
            <Checkbox />
            <ListItemText primary="Merge Sort" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

export default SprintlineDrawer;
