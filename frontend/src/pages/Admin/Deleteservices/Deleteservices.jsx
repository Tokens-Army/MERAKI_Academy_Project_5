import React,{useState,useEffect,Suspense} from 'react'
import { useNavigate } from 'react-router-dom'
import { Await,useLoaderData } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import "./Deleteservices.css"
import { deleteService, setServices } from '../../../service/redux/serviceSlice'
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
const Deleteservices = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const services = useSelector((state)=>state.services.services)
  const token = useSelector((state)=>state.login.token)
  
  useEffect(()=>{
    axios.get("http://localhost:5000/services")
    .then((results)=>{
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
        <Button onClick={()=>{
          handleOpen()
          setId(service.id)
          setName(service.name)
        }}>❌</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          
          Are you sure you want to delete the service {name}?
          </Typography>
          <Typography className='deletebox' id="modal-modal-description" sx={{ mt: 2 }}>
          
          <div className='deleteadminaccountbutton' onClick={()=>{
                      axios.put(`http://localhost:5000/services/delete/${id}`,{id},{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((result)=>{
                        dispatch(deleteService(id))
                      })
                      .catch((err)=>{
                        console.log(err);
                      })
                    }}>Yes</div>
            
          </Typography>
        </Box>
      </Modal>
        </div>
      })}



  </div>)
    }

export default Deleteservices