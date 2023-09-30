import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => <h1>📍</h1>;

const Location = (props) => {
  const [myLoc, setMyLoc] = useState({ lat: 31.92425, lng: 35.917441 });
  const defaultProps = {
    center: {
      lat: 31.92425,
      lng: 35.917441,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {myLoc && (
        <GoogleMapReact
          center={myLoc}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          // onGoogleApiLoaded={({ map, maps }) => {
          //   console.log(myLoc);
          //   new maps.Marker({
          //     position: { lat: myLoc.lat, lng: myLoc.lng },
          //     map,
          //     center: { lat: myLoc.lat, lng: myLoc.lng },
          //     title: "hellooooooooooooooooo",
          //   });
          // }}
          onClick={(e) => {
            // console.log(e, { lat: e.lat, lng: e.lng });
            setMyLoc({ lat: e.lat, lng: e.lng });
          }}
        >
          <Marker
            lat={myLoc.lat}
            lng={myLoc.lng}
            text="My Marker"
            // icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default Location;
