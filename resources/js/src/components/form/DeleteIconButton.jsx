import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteIconButton = ({ title, description, confirmHandler = null }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (confirmHandler) {
            confirmHandler();
        } else {
            setOpen(false);
        }
    };

    return (
        <>
            <IconButton color="error" onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteIconButton;
