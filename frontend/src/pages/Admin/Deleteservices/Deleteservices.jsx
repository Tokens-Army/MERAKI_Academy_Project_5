import React,{useState,useEffect,Suspense} from 'react'
import { useNavigate } from 'react-router-dom'
import { Await,useLoaderData } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import "./Deleteservices.css"
import { deleteService, setServices } from '../../../service/redux/serviceSlice'

const Deleteservices = () => {
  const dispatch = useDispatch()
 
  const services = useSelector((state)=>state.services.services)
  const token = useSelector((state)=>state.login.token)
  
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
  
  return(  <div  className='deleteServiceCard'>
      {services&&services.map(service=>{
        return <div key={service.id} >
        
        <div>{service.name}</div>
        <img className='deleteserviceImg' src={service.img}/>
        <div>{service.description}</div>
        <div>{service.price}</div>
        <div className='deleteadminaccountbutton' onClick={()=>{
                      axios.put(`http://localhost:5000/services/delete/${service.id}`,{id:service.id},{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((result)=>{
                        console.log(result);
                        console.log(service.id);
                        dispatch(deleteService(service.id))
                      })
                      .catch((err)=>{
                        console.log(err);
                      })
                    }}>❌</div>
        </div>
      })}



  </div>)
    }

export default Deleteservices