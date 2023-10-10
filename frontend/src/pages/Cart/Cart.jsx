import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cart, setCart] = useState({});

  const handleDeleteClose = () => setDeleteOpen(false);

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
    <div style={{ minHeight: "80%" }}>
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
          className="CARDS"
          sx={{
            width: "80%",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            transition: "0.3s",
            backgroundColor: "#fff",
            borderRadius: "10px",
            overflow: "scroll",
            p: 2,
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            Your Cart
          </Typography>
          <h3 className="cart-titles">Employee</h3>
          {cart.employee ? (
            <CardContent style={{ display: "flex", columnGap: "2vw" }}>
              <img
                src={cart.employee.img}
                className="cart-image"
                alt="employee pic"
              />
              <div className="secondary-info">
                <Typography variant="h6" component="div">
                  Name: {cart.employee.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone Number: {cart.employee.phonenum}
                </Typography>
              </div>
            </CardContent>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No employee assigned yet
            </Typography>
          )}
          <h3 className="cart-titles">Service</h3>
          {cart.order && (
            <Card elevation={0}>
              <CardContent style={{ display: "flex", columnGap: "2vw" }}>
                <img src={cart.order.service_img} className="cart-image" />
                <div className="secondary-info">
                  <Typography variant="h5" component="div">
                    {cart.order.service_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {cart.order.service_price} JD
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Delivery: 2 JDs
                  </Typography>
                </div>
              </CardContent>
            </Card>
          )}
          <h3 className="cart-titles">Accessories</h3>
          {cart.accessories &&
            cart.accessories.map((accessory, i) => (
              <Card key={i} elevation={0}>
                <CardContent style={{ display: "flex", columnGap: "2vw" }}>
                  <img src={accessory.accessory_img} className="cart-image" />
                  <div className="secondary-info">
                    <Typography variant="h5" component="div">
                      {accessory.accessory_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {accessory.accessory_price}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          <Typography variant="h6" component="div" gutterBottom>
            Total Price: {totalPrice} JD
          </Typography>
          <Button variant="contained" onClick={() => navigate("/contact-us")}>
            Contact Us
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => {
              setDeleteOpen(true);
            }}
          >
            Delete Order
          </Button>
        </Box>
        <Modal
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this Order?
            </Typography>
            <Button
              onClick={() => {
                handleDeleteOrder(order.id);
              }}
            >
              Yes
            </Button>
            <Button onClick={handleDeleteClose}>No</Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Cart;
