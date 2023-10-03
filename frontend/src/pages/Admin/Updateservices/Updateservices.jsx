import React,{useState,useEffect} from 'react'
import "./Updateservices.css"
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setServices, updateServices } from '../../../service/redux/serviceSlice'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Updateservices = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [updatebtn, setUpdatebtn] = useState(false)
  const [id, setId] = useState(0) 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=>{
    return state.login.token    
  })
  
  const services = useSelector((state)=>state.services.services)
  
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
      
    {services&&services.map(service=>{
      return<div key={service.id} className='updateServiceCard'>
        <div className='serviceName'>{service.name}</div>
        <img className='serviceImg' src={service.img}/>
        <div className='serviceDescription'>{service.description}</div>
        <div className='servicePrice'>{service.price}</div>
        
        <Button onClick={()=>{
          handleOpen()
          setId(service.id)
          setName(service.name)
        }}>Update Service</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className='inputsDivUpdate'>
            <h6>Update {name} service from here </h6>
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
      axios.put(`http://localhost:5000/services/${id}`,{name,img,description,price},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results)=>{
        dispatch(updateServices(results.data.result))
        
      })
      .catch((err)=>{
        <>Some thing went wrong kindly try again later</>
        console.log(err);
      })
    }}>Update</button>
          </div>  
            </Typography>
          </Box>
        </Modal>   
      </div>
    })}
    </div>
    </div>
  )
}

export default Updateservices