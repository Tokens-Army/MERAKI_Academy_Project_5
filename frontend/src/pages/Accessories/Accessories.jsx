import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Accessories.css"
import {BsCartPlus} from "react-icons/bs"
import { Card } from 'react-bootstrap'
const Accessories = () => {
const [accessoriesList, setAccessoriesList] = useState("")
const navigate = useNavigate()    
useEffect(()=>{
        axios.get("http://localhost:5000/accessories/")
        .then((results)=>{
            // console.log(results.data.result);
            setAccessoriesList(results.data.result)
        })
        .catch((err)=>{
            navigate("/error")
        })
    },[])
    return (
        <div>
        Accessories

<div className='accessoryCardAll'>

{accessoriesList&&accessoriesList.map(accessory=>{
    return (
      <div className='productinfocategory'>
            
      {/* <img className='productImg' src={product.img}/> */}
      <div className="container">
<img src={accessory.img}  alt="Avatar" className="accessoryImg" />
<div className="middle">
<div onClick={()=>{}} className="text">Add {accessory.name} To Cart</div>
</div>
</div>
      <div className='productName'>{accessory.name}</div>
      <div className='productPrice'>{accessory.price} JD</div>
      <img className='addtocart2' src='https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=' onClick={()=>{}}/>
  </div>
    )
    
})}
</div>
        </div>
        )
}

export default Accessories