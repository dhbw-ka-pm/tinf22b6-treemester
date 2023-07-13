import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


function SaveFile(props) {

    const [open, setOpen] = useState(false);
    const [fileNameEmpty, setFileNameEmpty] = useState(false);

    let defaultValue = props.defaultValue ? props.defaultValue : "your_circle_packing"

    return (
        <>
            <button onClick={() => setOpen(true)}>{props.buttonText}</button>
            <Dialog open={open}>
                <DialogTitle>{props.buttonText}</DialogTitle>
                <DialogContent>
                    <TextField id="fileNameInput"
                        label="File Name"
                        type="text"
                        placeholder="your_circle_packing"
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                        props.onSave()
                        setOpen(false);
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SaveFile;