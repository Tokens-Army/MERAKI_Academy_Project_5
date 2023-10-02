import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Margin } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({});

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "80%",
          boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          p: 2,
        }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          Your Cart
        </Typography>
        {cart.order && (
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h5" component="div">
                Service Name: {cart.order.service_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {cart.order.service_price}
              </Typography>
            </CardContent>
          </Card>
        )}
        {cart.accessories &&
          cart.accessories.map((accessory) => (
            <Card key={accessory.name} elevation={0}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Accessory Name: {accessory.accessory_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {accessory.accessory_price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        <Typography variant="h6" component="div" gutterBottom>
          Total Price: {totalPrice}
        </Typography>
          <Button variant="contained">Checkout</Button>
          <Button
            variant="contained"
            sx={{ml: 1}}
            onClick={() => handleDeleteOrder(order.id)}
          >
            Delete Order
          </Button>
      </Box>
    </Box>
  );
};

export default Cart;
