import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Await, useLoaderData } from "react-router-dom";
import "./Accessories.css"

const Home = () => {
  const [services, setServices] = useState([]);
  const { result } = useLoaderData();
  // useEffect(() => {}, []);
  return (
    <div>
      <Suspense fallback={<>loading......</>}>
        <Await resolve={result} errorElement={<>error .....</>}>
          {
          (result) => {
            

            return(
            <div>
              {/* Your order is : ghaseel sayara w sho bedak tdef 3leh */}
              
            <div className="accessoryCard">
{result.map((accessory) => {
  return (
    <div className="a">
                <section className="sec">
  <div class="text-center container py-5">
    <h4 class="mt-4 mb-5"><strong>Bestsellers</strong></h4>

    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4">
        <div class="card">
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img className="accessoryImg"src={accessory.img} />
            <a href="#!">
              <div class="mask">
                <div class="d-flex justify-content-start align-items-end h-100">
                  <h5><span class="badge bg-primary ms-2">Add to cart</span></h5>
                </div>
              </div>
              <div class="hover-overlay">
                <div class="mask" ></div>
              </div>
            </a>
          </div>
          <div class="card-body">
            <a href="" class="text-reset">
              <h5 class="card-title mb-3">{accessory.name}</h5>
            </a>
            <a href="" class="text-reset">
              <p>{accessory.description}</p>
            </a>
            <h6 class="mb-3">Price {accessory.price} JDs</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      

    </div>
  </div>
</section>         

                
                </div>
              );
            })};
            
          </div>
            </div>
            ) 
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export const accessoriesLoader = async () => {
  const result = axios.get("http://localhost:5000/accessories").then((result) => {
    return result.data.result;
  });
  // console.log(result.data.services);
  return { result };
};
export default Home;
