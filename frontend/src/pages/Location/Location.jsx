import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useSelector } from "react-redux";

const Marker = ({ text }) => <h1>📍</h1>;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Location = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [myLoc, setMyLoc] = useState({ lat: 31.92425, lng: 35.917441 });

  const defaultProps = {
    center: {
      lat: 31.92425,
      lng: 35.917441,
    },
    zoom: 11,
  };

  const order = useSelector((state) => {
    return state.order.order;
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Stack spacing={2} sx={{ width: "10%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Added location successfully!
          </Alert>
        </Snackbar>
      </Stack>
      <div style={{ height: "90%" }}>
        <GoogleMapReact
          center={myLoc}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onClick={(e) => {
            setMyLoc({ ...myLoc, ...{ lat: e.lat, lng: e.lng } });
            console.log(myLoc);
          }}
        >
          <Marker lat={myLoc.lat} lng={myLoc.lng} text="My Marker" />
        </GoogleMapReact>
      </div>
      <div style={{ marginRight: "16%" }}>
        <TextField
          margin="normal"
          id="building"
          label="Building"
          name="building"
          onChange={(e) => {
            setMyLoc({ ...myLoc, ...{ buildingName: e.target.value } });
            console.log(myLoc);
          }}
        />
        <TextField
          margin="normal"
          id="home"
          label="Home"
          name="home"
          onChange={(e) => {
            setMyLoc({ ...myLoc, ...{ HomeNo: e.target.value } });
            console.log(myLoc);
          }}
        />
      </div>
      <Button
        sx={{ mt: 2, mr: 38 }}
        variant="contained"
        onClick={() => {
          axios
            .put(`http://localhost:5000/orders/location/${order.id}`, {
              location: JSON.stringify(myLoc),
            })
            .then((result) => {
              setOpen(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        confirm my location
      </Button>
    </div>
  );
};

export default Location;
