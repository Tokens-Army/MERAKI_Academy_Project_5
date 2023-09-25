import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <div>Notfound</div>
      back to <NavLink to="/">Home</NavLink>
    </>
  );
};

export default Notfound;
