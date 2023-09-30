import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}❌</div>;

const Location = (props) => {
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
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent
          lat={31.92425}
          lng={35.917441}
          text="My Marker"
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Location;
