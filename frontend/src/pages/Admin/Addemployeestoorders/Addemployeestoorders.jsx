import React,{useState,useEffect} from 'react'
import "./Addemployeestoorders.css"
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux'
import { setEmployees } from '../../../service/redux/employeeSlice'
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
const Addemployeestoorders = () => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const [id, setId] = useState("")
    const dispatch = useDispatch()
    const employees = useSelector((state)=>state.employees.employees)
    useEffect(()=>{
        axios.get("http://localhost:5000/orders/employees/employees")
        .then((results)=>{
            console.log(results.data);
            dispatch(setEmployees(results.data))
        })
        .catch(err=>console.log(err))
    },[])
    return (
    <div>
        <div className='ordersCard'>
        <div className='ordersCardEmployees'>
                <h3>Order Id</h3>
                <h3>Created At</h3>
                <h3>Order Status</h3>
                <h3>Employee Id</h3>
                <h3>User Id</h3>
                <h3>Add Employee</h3>
            </div>
        {employees.orders?employees.orders.map(order=>{
            return<div className='ordersInfo' key={order.id}>
                <div>{order.id}</div>
                <div>{order.created_at}</div>
                {order.order_status==="pending"?<div className='orderStatusPending'>{order.order_status}</div>:<div className='orderStatusAccepted'>
                    {order.order_status}</div>
                    }
                <h5>{order.employee_id}</h5>    
                <div>{order.user_id}</div>
                <Button onClick={()=>{
          handleOpen()
          setId(order.id)
        }}>Add Employees</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          
          Which employee do you want to add to this on this order?
          </Typography>
          <Typography className='deletebox' id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='employeeCard'>
        <div className='employeeInfo'>
                <h5>Id</h5>
                <h5>Name</h5>
                <h5>Image</h5>
                <h5>Phone number</h5>
                <h5>Availability</h5>
            </div>
        {employees.employees?employees.employees.map(employee=>{
            return<div className='employeeInfo' key={employee.id}>
                <h5>{employee.id}</h5>
                <h5>{employee.name}</h5>
                <img className='employeeImg' src={employee.img}/>
                <h5>{employee.phonenum}</h5>
                <h5>{employee.availability}</h5>
                <button onClick={()=>{
                    axios.put(`http://localhost:5000/orders/addemployees/${order.id}/${employee.id}`)
                    .then((results)=>{
                        console.log(results);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }} >add</button>
            </div>
        }):<h2>No employees are available right now</h2>
    }
        </div>
          </Typography>
        </Box>
      </Modal>
            </div>
        }):<h2>No employees are available right now</h2>
    }
        </div>
    </div>
  )
}

export default Addemployeestoorders