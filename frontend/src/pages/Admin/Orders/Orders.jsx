import React,{useState,useEffect} from 'react'
import "./Orders.css"
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { setOrders } from '../../../service/redux/orderSlice'

const Orders = () => {
    const orders = useSelector((state)=>state.order.orders)
    const token = useSelector((state)=>state.login.token)
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get(`http://localhost:5000/orders`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((results)=>{
            // console.log(results.data.orders);
            dispatch(setOrders(results.data.orders))
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return (<div>
        <div className='infosorders'>
        <h3>Order id</h3>
        <h3>Created at</h3>
        <h3>User Id</h3>
        <h3>Order Status</h3>
        </div>
    <div className='ordersCardDiv'>
           {orders&&orders.map(ord=>{
               return <div key={ord.id} className='ordersInfos'>
                <div>{ord.id}</div>
                <div>{ord.created_at}</div>
                <div>{ord.user_id}</div>
                <div>{ord.order_status}</div>
                </div>
           })}
    </div>
           </div>
  )
}

export default Orders