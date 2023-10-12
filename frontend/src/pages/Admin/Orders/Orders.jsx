import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOrders } from "../../../service/redux/orderSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState("");
  const [priceAll, setPriceAll] = useState(0)
  // let totalPrice=0
  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results) => {
        dispatch(setOrders(results.data.orders));
        
    
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // let totalPrice = details ? ;

  
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
                        const totalPrice= results.data.Details.reduce(
                          (sum, accessory) => sum + accessory.accessory_price,
                          0
                        )
                        setPriceAll(results.data.Details[0].service_price+totalPrice)
                        
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
                    <Box sx={style} className="MoreDetailsBox">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {details && (
                          <div className="ccc">
                              <div className="resultss">
                            <span className="disc">User name :{" "}</span>
                              {details[0]?.firstname.charAt(0).toUpperCase() + details[0].firstname.slice(1) +
                                " " +
                                details[0]?.lastname.charAt(0).toUpperCase() + details[0].lastname.slice(1)}
                                </div>
                            {details[0]?.employee_id?<div className="resultss"><span className="disc">Employee Id : </span>{details[0]?.employee_id}</div>:<div className="resultss"><span className="disc"> Employee id : </span> Not selected yet</div>}

                            <div className="resultss">
                            <span  className="disc">Service Name :</span>
                            {details[0]?.service_name}
                            </div>
                            <span className="disc">Accessories names:</span>
                            <ol>
                            {details?.map((detail,i) => {
                              return (
                                <div key={i}> 
                                  <li className="resultss">{detail.accessory_name}</li>
                                </div>
                              );
                            })}
                            </ol>
                            <div className="resultss"><span className="disc">Total price : </span>{priceAll}</div>
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
