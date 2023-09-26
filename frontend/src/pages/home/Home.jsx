import React, { Suspense } from "react";
import axios from "axios";
import { Await, useLoaderData } from "react-router-dom";
const Home = () => {
  const { result } = useLoaderData();
  return (
    <div>
      <Suspense fallback={<>loading......</>}>
        <Await resolve={result} errorElement={<>error .....</>}>
          {(result) => {
            return result.map((service) => {
              return (
                <div key={service.id}>
                  {service.name}
                  <>
                    <img src={service.img} />
                  </>
                </div>
              );
            });
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export const serviceLoader = async () => {
  const result = axios.get("http://localhost:5000/services").then((result) => {
    return result.data.services;
  });
  return { result };
};
export default Home;
