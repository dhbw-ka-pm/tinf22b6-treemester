import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import ReactFileReader from 'react-file-reader';
import { useState } from "react";


function CreateSprintline(props) {

    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileNameEmpty, setFileNameEmpty] = useState(false);

    let defaultValue = props.defaultValue ? props.defaultValue : "MySprintline"
    
    const handleSave = () => {
        if (fileName.length === 0) {
          setFileNameEmpty(true);
          return;
        }
    
        props.onSave();
        setOpen(false);
      };
    
    return (
        <>
            <button onClick={() => setOpen(true)}>{props.buttonText}</button>
            <Dialog open={open}>
                <DialogTitle>{props.buttonText}</DialogTitle>
                <DialogContent>
                    <TextField id="elementInput"
                        label="Element Name"
                        type="text"
                        placeholder="your_sprint_element"
                        margin="dense"
                        variant="standard"
                        autoFocus
                        fullWidth
                        error={fileNameEmpty}
                        defaultValue={defaultValue}
                        onChange={(event) => {
                            setFileNameEmpty(event.target.value.length === 0)
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    .xml
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false);}}>Cancel</Button>
                    <Button onClick={() => {
                        //handleSave();
                        props.onSave();
                        setOpen(false);
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default CreateSprintline;