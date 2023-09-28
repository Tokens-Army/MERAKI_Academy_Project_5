import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Deleteaccessories = () => {
  const navigate = useNavigate()
    return (
    <div>Deleteaccessories
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    </div>
  )
}
export default Deleteaccessories