import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "/images/redberry.jpg";

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
            <img src={Logo} width={90} alt="Redberry" />
        </Typography>
    );
};

export default Header;
