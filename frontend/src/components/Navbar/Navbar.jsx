import React from "react";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h3>Spotless Wash</h3>
      </div>
      <div className="navbar-search">
        <input placeholder="Search" />
      </div>
      <div>
        <h3 >Home</h3>
      </div>
      <div>
        <h3>About </h3>
      </div>
      <div>
        <h3>Contact Us</h3>
      </div>
      <div>
        <h3>Login</h3>
      </div>
    </div>
  );
};

export default Navbar;
