import React,{useState,useEffect} from 'react'
import "./Updateservices.css"
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setServices, updateServices } from '../../../service/redux/serviceSlice'
import { useNavigate } from 'react-router-dom'
const Updateservices = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [updatebtn, setUpdatebtn] = useState(false)
  const [id, setId] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=>{
    return state.login.token    
  })
  
  const state = useSelector((state)=>{
    return{
      services:state.services.services
    }
  })
  useEffect(()=>{
    axios.get("http://localhost:5000/services")
    .then((results)=>{
      dispatch(setServices(results.data.services))
    })
    .catch((err)=>{
      <div>Loading stanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      console.log(err);
    })
  },[])
  return (
    <div className='updateServicesPage'>
    <button  onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    <div className='middleUpdateServices'>
      
    {state.services.map(service=>{
      return<div key={service.id} className='updateServiceCard'>
        <div className='serviceName'>{service.name}</div>
        <img className='serviceImg' src={service.img}/>
        <div className='serviceDescription'>{service.description}</div>
        <div className='servicePrice'>{service.price}</div>
        {!updatebtn&&
        <button className='toUpdatePageBtn' onClick={()=>{
          setId(service.id)
          setUpdatebtn((prev)=>{
            return !prev
          })
        }}>Open inputs</button>}
        {updatebtn&&service.id===id&&
          <div className='inputsDivUpdate'>
            <h6>Update your services from here</h6>
    <input placeholder='New name' className='updateServicesInputs' type="text" onChange={(e)=>{
            setName(e.target.value)
    }}/>
    <input placeholder='New img'  className='updateServicesInputs' type='text' onChange={(e)=>{
      setImg(e.target.value)
    }}/>
    <input placeholder='New description'  className='updateServicesInputs' type='text' onChange={(e)=>{
      setDescription(e.target.value)
    }}/>
    <input placeholder='New price'  className='updateServicesInputs' type='number' onChange={(e)=>{
        setPrice(e.target.value)
    }}/>
    <button className='updateServicesInputs' onClick={()=>{
      console.log({name});
      axios.put(`http://localhost:5000/services/${service.id}`,{name,img,description,price},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results)=>{
        dispatch(updateServices({id:service.id,name,img,description,price}))
      })
      .catch((err)=>{
        <>Some thing went wrong kindly try again later</>
        console.log(err);
      })
      
    }}>Update</button>
    <button className='hideBtn' onClick={()=>{
      setUpdatebtn((prev)=>{
        return !prev
      })
    }}>Hide</button>
          </div>}
      </div>
    })}
    </div>
    </div>
  )
}

export default Updateservices