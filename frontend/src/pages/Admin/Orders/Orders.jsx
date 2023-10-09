import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOrderDetails, setOrders } from "../../../service/redux/orderSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const token = useSelector((state) => state.login.token);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const dispatch = useDispatch();
  const [updateBtn, setUpdateBtn] = useState(false);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results) => {
        // console.log(results.data.orders);
        dispatch(setOrders(results.data.orders));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="infosorders">
        <h3>Order id</h3>
        <h3>Created at</h3>
        <h3>User Id</h3>
        <h3>Order Status</h3>
        <h3>Order Details</h3>
      </div>
      <div className="ordersCardDiv">
        {orders &&
          orders.map((ord) => {
            return (
              <div key={ord.id} className="ordersInfos">
                <div>{ord.id}</div>
                <div>{ord.created_at}</div>
                <div>{ord.user_id}</div>
                {ord.order_status === "accepted" ? (
                  <div className="true">{ord.order_status}</div>
                ) : (
                  <div className="false">{ord.order_status}</div>
                )}
                <Button
                  onClick={() => {
                    axios
                      .get(
                        `http://localhost:5000/orders/orderDetails/${ord.id}`
                      )
                      .then((results) => {
                        handleOpen();
                        setDetails(results.data.Details);
                        console.log(results.data.Details);
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    setId(ord.id);
                  }}
                >
                  Show Details
                </Button>

                {id === ord.id && (
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Update accessory from here
                        {details && (
                          <div>
                            <div>
                              User name :{" "}
                              {details[0]?.firstname +
                                " " +
                                details[0]?.lastname}
                            </div>
                            <div>Service Name : {details[0]?.service_name}</div>
                            {details?.map((detail) => {
                              return (
                                <div key={detail.accessory_id}>
                                  Item: {detail.accessory_name}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </Typography>
                    </Box>
                  </Modal>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Orders;
