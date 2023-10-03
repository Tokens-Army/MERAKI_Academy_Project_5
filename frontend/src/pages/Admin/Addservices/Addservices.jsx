import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Addservices.css"
import axios from 'axios'
import { setServices,addServices,updateServices } from '../../../service/redux/serviceSlice'
import { useDispatch, useSelector } from 'react-redux/'
const Addservices = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const services = useSelector((state)=>state.services.services)
  const token = useSelector((state)=>{
    return state.login.token    
  })
  
    useEffect(()=>{
      axios.get("http://localhost:5000/services")
      .then((results)=>{
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
      if (!name||!img||!description||!price){
        console.log("Kindly fill all the fields");
        <div>Fill all the fields please</div>
      }else{
        dispatch(addServices({name,img,description,price}))
        axios.post("http://localhost:5000/services",{name,img,description,price},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((results)=>{
          <>Service added successfully</>
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      }}>Add Service</button>
    </div>
    <div>
    </div>
      {services&&services.map(service=>{
       return <div key={service.id}>
        <div>{service.name}</div>
        <img className='serviceimgaddservicepage' src={service.img}/>
        <div>{service.description}</div>
        <div>Price {service.price} JD only</div>
        
       </div>
      })}
    </div>
    </div>
  )
}

export default Addservices