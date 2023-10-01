import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Addservices.css"
import axios from 'axios'
import { setServices,addServices,updateServices,deleteServices } from '../../../service/redux/serviceSlice'
import { useDispatch, useSelector } from 'react-redux/'
const Addservices = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector((state)=>{
    return {
      services:state.services.services
    }
  })
  const token = useSelector((state)=>{
    return state.login.token    
  })
  
    useEffect(()=>{
      axios.get("http://localhost:5000/services")
      .then((results)=>{
        console.log(results.data.services);
        dispatch(setServices(results.data.services))
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])
    return (
    <div>Addservices
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    <div className='servicemiddlespace'>
      <div></div>
    <div className='serviceinputsdiv'>
    <input className='serviceinputs' placeholder='Service name' onChange={(e)=>{
      setName(e.target.value)
    }} />
    <input className='serviceinputs' placeholder='Service img' onChange={(e)=>{
      setImg(e.target.value)
    }} />
    <input className='serviceinputs' placeholder='Service description "dont input more than 255 charachters"' onChange={(e)=>{
      setDescription(e.target.value)
    }}/>
    <input className='serviceinputs' placeholder='Service price' onChange={(e)=>{
      setPrice(e.target.value)
    }}/>
    <button className='addServiceBtn' onClick={()=>{
      console.log(state.services);
      if (!name||!img||!description||!price){
        console.log("Didn't add");
        <div>Fill all the inputs please</div>
      }else{
        console.log("Service added successfully");
        dispatch(addServices({name,img,description,price}))
        axios.post("http://localhost:5000/services",{name,img,description,price},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((results)=>{
          console.log(results);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      }}>Add Service</button>
    </div>
    <div></div>
    </div>
    </div>
  )
}

export default Addservices