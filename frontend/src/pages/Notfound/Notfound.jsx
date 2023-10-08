import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <p>Notfound</p>
      back to <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default Notfound;
