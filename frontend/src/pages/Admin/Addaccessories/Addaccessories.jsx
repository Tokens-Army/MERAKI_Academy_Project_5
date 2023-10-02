import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessories } from "../../../service/redux/accessorySlice";
import axios from "axios";

const Addaccessories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessories = useSelector((state) => {
    return state.accessories.accessories;
  });

  const getAllAccessories = () => {
    axios
      .get("http://localhost:5000/accessories")
      .then((result) => {
        console.log(result.data.result);
        dispatch(setAccessories(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllAccessories();
  }, []);
  return (
    <>
      {console.log(accessories)}
      {accessories &&
        accessories.map((accessory) => {
          // return <img src={accessory.img} width="20px" />;
        })}
    </>
  );
};

export default Addaccessories;
