import React,{useState,useEffect} from 'react'
import "./Addemployeestoorders.css"
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux'
import { addEmployee, setData } from '../../../service/redux/employeeSlice'
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
    const data = useSelector((state)=>state.employees.data)
    useEffect(()=>{
        axios.get("http://localhost:5000/orders/employees/employees")
        .then((results)=>{
            dispatch(setData(results.data))
        })
        .catch(err=>console.log(err))
    },[])

    return (
    <div>
        <div className='ordersCard'>
        <div className='ordersCardEmployees'>
                <div>Order Id</div>
                <div>Created At</div>
                <div>Order Status</div>
                <div>Employee Id</div>
                <div>User Id</div>
                <div>Add Employee</div>
            </div>
        {data.orders?data.orders.map(order=>{
            return<div className='ordersInfo' key={order.id}>
                <div>{order.id}</div>
                <div>{order.created_at}</div>
                {order.order_status==="pending"?<div className='orderStatusPending'>{order.order_status}</div>:<div className='orderStatusAccepted'>
                    {order.order_status}</div>
                    }
                {order.employee_id?<div>{order.employee_id}</div>:<div>Not selected yet</div>}    
                <div>{order.user_id}</div>
                {order.employee_id?<Button onClick={()=>{
          handleOpen()
          setId(order.id)
        }}>Edit Employees</Button>:<Button onClick={()=>{
          handleOpen()
          setId(order.id)
        }}>Add Employees</Button>}
        {id===order.id&&
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
          <>
          <Typography className='deletebox' id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='employeeCard'>
        <div className='employeeInfo'>
                <div>Id</div>
                <div>Name</div>
                <div>Image</div>
                <div>Phone number</div>
                <div>Availability</div>
            </div>
        {data.employees?data.employees.map(employee=>{
            return<div className='employeeInfo' key={employee.id}>
                <div>{employee.id}</div>
                <div>{employee.name}</div>
                <img className='employeeImg' src={employee.img}/>
                <div>{employee.phonenum}</div>
                <div>{employee.availability}</div>
                <button onClick={()=>{
                    
                    axios.put(`http://localhost:5000/orders/addemployees/${order.id}/${employee.id}`)
                    .then((results)=>{
                       
                        dispatch(addEmployee({id:order.id,employee_id:employee.id,order_status:order.order_status}))

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }} >add</button>
            </div>
        }):<div>No employees are available right now</div>
    }
        </div>
          </Typography>
          </>
        </Box>
      </Modal>
    }
            </div>
        }):<div>No employees are available right now</div>
    }
        </div>
    </div>
  )
}

export default Addemployeestoorders