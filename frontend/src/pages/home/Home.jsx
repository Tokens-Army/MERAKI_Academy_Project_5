import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Await, useLoaderData } from "react-router-dom";
const Home = () => {
  const [services, setServices] = useState([]);
  const { result } = useLoaderData();
  // useEffect(() => {}, []);
  return (
    <div>
      <Suspense fallback={<>loading......</>}>
        <Await resolve={result} errorElement={<>error .....</>}>
          {result &&
            result.map((service) => {
              return (
                <div key={service.id}>
                  {service.name}
                  <>
                    <img src={service.img} />
                  </>
                </div>
              );
            })}
        </Await>
      </Suspense>
    </div>
  );
};

export const serviceLoader = async () => {
  const result = axios.get("http://localhost:5000/services");
  console.log(result.data.services);
  return { result: result.data.services };
};
export default Home;
