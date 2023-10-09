import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css"
const Cart = () => {
  const obj={}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const total_priceAll = useSelector((state) => state.order.total_price);
  const totalCash = useSelector((state) => state.order.totalCash);
  const token = useSelector((state) => {
    return state.login.token;
  });

  const order = useSelector((state) => state.order.order);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`http://localhost:5000/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  let totalPrice = cart.order ? cart.order.service_price : 0;
  if (cart.accessories) {
    totalPrice += cart.accessories.reduce(
      (sum, accessory) => sum + accessory.accessory_price,
      0
    );
  }

  return (
    <div style={{minHeight: "80%"}} className="ddd">
      <div></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
          maxHeight: "74vh",
          overflow:"hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          className="CARDS"
          sx={{
            width: "80%",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            transition: "0.3s",
            backgroundColor: "#fff",
            borderRadius: "10px",
            minHeight:"50vh",
            overflowY:"scroll",
            p: 1,
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            Your Cart
          </Typography>
          {cart.employee ? (
            <CardContent>
              <img src={cart.employee.img}/>
              <Typography variant="h6" component="div">
                Employee: {cart.employee.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone Number: {cart.employee.phonenum}
              </Typography>
            </CardContent>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No employee assigned yet
            </Typography>
          )}
          {cart.order && (
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Service : {cart.order.service_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {cart.order.service_price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Delivery: 2 JDs
                </Typography>
              </CardContent>
            </Card>
          )}
          Accessories:
          <ol>
            {
              cart.accessories &&
              cart.accessories.map((accessory) => (
                <Card key={accessory.name} elevation={0}>
                <CardContent>
                  <Typography variant="h5" component="div">
                     <li className="liii">{accessory.accessory_name}</li>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {accessory.accessory_price}
                  </Typography>
                </CardContent>
              </Card>
            ))
          }
          </ol>
        </Box>
          
        <Typography variant="h6" component="div" gutterBottom>
          Total Price: {totalPrice+2}
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: 1 }}
          onClick={() => handleDeleteOrder(order.id)}
        >
          Delete Order
        </Button>
      </Box>
      <div></div>
    </div>
  );
};

export default Cart;
