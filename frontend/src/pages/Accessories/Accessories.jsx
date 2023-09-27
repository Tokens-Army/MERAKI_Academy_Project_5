import React, {useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Accessories.css"
import {BsCartPlus} from "react-icons/bs"
import { Card } from 'react-bootstrap'
import { Await,useLoaderData } from 'react-router-dom'
const Accessories = () => {
    const { result } = useLoaderData();
    const navigate = useNavigate()    
    return (
        <div>
        Accessories

<div className='accessoryCardAll'>
<Suspense fallback={<>Loading...</>}>
<Await resolve={result} errorElement={<>Error Loading data refresh please</>}>
{(result)=>{ 
    return result.map(accessory=>{
    return (    
    <div className='productinfocategory'>
    <div className="container">
<img className="accessoryImg" alt="Avatar" src={accessory.img} />
<div className="middle">
<div onClick={()=>{}} className="text">Add {accessory.name} To Cart</div>
</div>
</div>
      <div className='productName'>{accessory.name}</div>
      <div className='productPrice'>{accessory.price} JD</div>
      <img className='addtocart2' src='https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=' onClick={()=>{}}/>
  </div>
    )
    
})}}
</Await>
</Suspense>
</div>
        </div>
        )
    }
    export const accessoriesLoader = async () => {
        const result = axios.get("http://localhost:5000/accessories").then((result) => {
            // console.log(result.data.result);  
            return result.data.result
        });
        return { result };
    };
    export default Accessories
    