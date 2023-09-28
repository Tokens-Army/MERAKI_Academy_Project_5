import React from 'react'
import { useNavigate } from 'react-router-dom'

const Deleteservices = () => {
    const navigate= useNavigate()
    return (
    <div>Deleteservices
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    </div>
  )
}

export default Deleteservices