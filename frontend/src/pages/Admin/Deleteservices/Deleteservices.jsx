import React,{useState,useEffect,Suspense} from 'react'
import { useNavigate } from 'react-router-dom'
import { Await,useLoaderData } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import "./Deleteservices.css"
import { deleteServices, setServices } from '../../../service/redux/serviceSlice'

const Deleteservices = () => {
  const dispatch = useDispatch()
  const state = useSelector((state)=>{
    return{
      services:state.services.services
    }
  })
  const token = useSelector((state)=>{
    return state.login.token    
  })
  
  useEffect(()=>{
    axios.get("http://localhost:5000/services")
    .then((results)=>{
      // console.log(results.data);
      dispatch(setServices(results.data.services))
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  
  return(  <div className='deleteServiceCard'>
      {state.services.map(service=>{
        return <div >
        
        <div>{service.name}</div>
        <img className='deleteserviceImg' src={service.img}/>
        <div>{service.description}</div>
        <div>{service.price}</div>
        </div>
      })}



  </div>)
    }

export default Deleteservices