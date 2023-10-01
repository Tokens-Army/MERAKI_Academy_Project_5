import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          sx={{
            color: '#fff',
            "&:hover": {
              backgroundColor: "transparent",
              transform: "scale(1.1)",
              color: '#fff',
            },
          }}
          onClick={() => navigate("/")}
        >
          Wash My Ride
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => navigate("/about")}>
          About
        </Button>
        <Button color="inherit" onClick={() => navigate("/contact-us")}>
          Contact Us
        </Button>
        <Button color="inherit" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
