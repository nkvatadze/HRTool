import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Typography
            style={{
                marginLeft: "2rem",
                marginTop: "2rem",
                textDecoration: "none",
                color: "black",
            }}
            variant="h4"
            gutterBottom
            component={Link}
            to="/"
        >
            HR Tool
        </Typography>
    );
};

export default Header;
