import React from 'react'
import { useNavigate } from 'react-router-dom'

const Addservices = () => {
  const navigate = useNavigate()
    return (
    <div>Addservices
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    </div>
  )
}

export default Addservices