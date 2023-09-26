import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Accessories.css"
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

<div className='accessoryCard'>

{accessoriesList&&accessoriesList.map(accessory=>{
    return (<div className='a'>
    <div>{accessory.name}</div>
    <img className='accessoryImg' src={accessory.img}/> 
    <div>{accessory.description}</div>   
    <div>Price {accessory.price} JDs</div>
        </div>
    )
    
})}
</div>
        </div>
        )
}

export default Accessories