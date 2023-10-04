import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessories, updateAccessory } from '../../../service/redux/accessorySlice';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Updateaccessories.css";

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

const UpdateAccessories = () => {

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector((state)=>{
    return state.login.token;
  });
  
  const accessories = useSelector((state)=>state.accessories.accessories);
  
  useEffect(()=>{
    axios.get("http://localhost:5000/accessories/")
    .then((results)=>{
      console.log(results.data.result);
      dispatch(setAccessories(results.data.result));
    })
    .catch((err)=>{
      <div>Loading...</div>
      console.log(err);
    })
  },[]);
  
  return (
    <div className='updateAccessoriesPage'>
      <button onClick={()=>{
        navigate("/admin")
      }}>Back to home page</button>
      <div className='middleUpdateAccessories'>
        {accessories && accessories.map(accessory=>{
          return<div key={accessory.id} className='updateAccessoryCard'>
            <div className='accessoryName'>{accessory.name}</div>
            <img className='UpdateAccessoryImg' src={accessory.img}/>
            <div className='accessoryDescription'>{accessory.description}</div>
            <div className='accessoryPrice'>{accessory.price}</div>
            
            <Button onClick={()=>{
              handleOpen()
              setId(accessory.id)
              setName(accessory.name)
            }}>Update Accessory</Button>
            
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update {name} accessory from here
                  <input className='updateAccessoryInputs' placeholder='New name' type="text" onChange={(e)=>{
                      setName(e.target.value)
                  }}/>
                  <input className='updateAccessoryInputs' placeholder='New img' type='text' onChange={(e)=>{
                    setImg(e.target.value)
                  }}/>
                  <input className='updateAccessoryInputs' placeholder='New description' type='text' onChange={(e)=>{
                    setDescription(e.target.value)
                  }}/>
                  <input className='updateAccessoryInputs' placeholder='New price' type='number' onChange={(e)=>{
                      setPrice(e.target.value)
                  }}/>
                  
                  <button onClick={()=>{
                    axios.put(`http://localhost:5000/accessories/${id}`,{name,img,description,price},{
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((results)=>{
                      dispatch(updateAccessory(results.data.result));
                    })
                    .catch((err)=>{
                      <>Some thing went wrong kindly try again later</>
                      console.log(err);
                    });
                  }}>Update</button>
                </Typography>
              </Box>
            </Modal>   
          </div>
        })}
      </div>
    </div>
  )
};

export default UpdateAccessories;