import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSelector } from "react-redux";

const Review = () => {
  const order = useSelector((state) => {
    return state.order.order;
  });
  const token = useSelector((state) => {
    return state.login.token;
  });
  const [myOrder, setMyOrder] = useState({});
  const [location, setLocation] = useState({});
  const [scheduleTime, setScheduleTime] = useState("");
  let totalPrice = 0;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setMyOrder(result.data);
        setLocation(JSON.parse(result.data.order.location));
        setScheduleTime(new Date(result.data.order.scheduled_time));
        // console.log(myOrder.order.service_name);
        console.log(result.data);
        console.log(result.data.order.service_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {myOrder.order && (
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={myOrder.order.service_name} />
          <Typography variant="body2">
            {myOrder.order.service_price} JD
          </Typography>
        </ListItem>
      )}
      <Typography variant="h6" gutterBottom>
        Accessories
      </Typography>
      <List disablePadding>
        {myOrder.accessories &&
          myOrder.accessories.map((accessory, i) => {
            if (i == 0) {
              totalPrice += myOrder.order.service_price;
            }
            totalPrice += accessory.accessory_price;
            return (
              <ListItem key={accessory.accessory_name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={accessory.accessory_name} />
                <Typography variant="body2">
                  {accessory.accessory_price} JD
                </Typography>
              </ListItem>
            );
          })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="shipping" />
          <Typography variant="body2">free</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice} JD
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Location
          </Typography>
          {location && (
            <Typography gutterBottom>
              ({location.lat}, {location.lng})
            </Typography>
          )}
          {location && (
            <Typography gutterBottom>
              {location.buildingName}, {location.HomeNo}
            </Typography>
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Scheduled Time
          </Typography>
          {scheduleTime && (
            <Typography gutterBottom>
              Date: {scheduleTime.toLocaleDateString()}
            </Typography>
          )}
          {scheduleTime && (
            <Typography gutterBottom>
              Day: {scheduleTime.toLocaleTimeString()}
            </Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
