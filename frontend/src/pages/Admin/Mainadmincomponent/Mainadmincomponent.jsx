import React,{useState,useEffect} from 'react'
import "./Mainadmincomponent.css"
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setMain } from '../../../service/redux/mainSlice'
const Mainadmincomponent = () => {
    const token = useSelector((state)=>state.login.token)
    const count = useSelector((state)=>state.main.data)
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get("http://localhost:5000/orders//pendingorders/count",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((results)=>{
         console.log(results.data);
         dispatch(setMain(results.data))
          
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return (
    <div>Mainadmincomponent
        {/* <div>Number of pending orders {count.pendingOrdersCount[0].count}
        {/* <div>Number of users{count.usersCount[0].count}</div> */}
    </div>
  )
}

export default Mainadmincomponent