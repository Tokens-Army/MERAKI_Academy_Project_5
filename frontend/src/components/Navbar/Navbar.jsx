import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h3>Wash My Ride</h3>
      </div>
      <div className="navbar-search">
        <input placeholder="Search" />
      </div>
      <div>
        <h3
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </h3>
      </div>
      <div>
        <h3>About </h3>
      </div>
      <div>
        <h3>Contact Us</h3>
      </div>
      <div>
        <h3
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </h3>
      </div>
    </div>
  );
};

export default Navbar;
