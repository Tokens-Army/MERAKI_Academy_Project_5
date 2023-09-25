import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((result) => {
        // console.log(result.data.services);
        setServices(result.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {services &&
        services.map((service) => {
          return (
            <>
              {service.name}
              <>
                <img src={service.img} />
              </>
            </>
          );
        })}
    </div>
  );
};

export default Home;
