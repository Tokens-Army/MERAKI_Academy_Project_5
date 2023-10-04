import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../service/redux/loginSlice";
import socketInit from "../../service/api/socket_server";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          sx={{
            color: "#fff",
            "&:hover": {
              backgroundColor: "transparent",
              transform: "scale(1.1)",
              color: "#fff",
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
        <Button
          color="inherit"
          onClick={() => {
            if (isLoggedIn) {
              navigate("/contact-us");
              // setSocket(socketInit({ user_id, token }));
            } else {
              navigate("/login");
            }
          }}
        >
          Contact Us
        </Button>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
