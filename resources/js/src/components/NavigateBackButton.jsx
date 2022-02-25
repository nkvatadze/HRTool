import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ to }) => {
    const navigate = useNavigate();

    return (
        <IconButton aria-label="back" onClick={() => navigate(to)}>
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;
