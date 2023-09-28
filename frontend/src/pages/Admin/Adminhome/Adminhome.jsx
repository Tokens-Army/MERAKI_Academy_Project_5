import React from "react";
import "./Adminhome.css"
import { Outlet, useNavigate } from "react-router-dom";
const Adminhome = () => {
  const navigate = useNavigate()
  return <div className="adminhomepage"> 

    <div className="adminleftbar">

    <button className="adminbuttons" onClick={()=>{
        navigate("addadmins")
    }}>Add Admins</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteadmins")
    }}>Delete Admins</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("addservices")
    }}>Add Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("updateservices")
    }}>Update Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteservices")
    }}>Delete Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("addaccessories")
    }}>Add Accessories</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("updateaccessories")
    }}>Update Accessories</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteaccessories")
    }}>Delete Accessories</button>
    </div>
    <div className="adminrightbar">
    <div className="adminnavbar"></div>
    <Outlet/>
    </div>
      
  </div>;
};

export default Adminhome;
