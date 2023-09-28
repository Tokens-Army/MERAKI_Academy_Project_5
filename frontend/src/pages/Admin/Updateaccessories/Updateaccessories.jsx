import React from 'react'
import { useNavigate } from 'react-router-dom'

const Updateaccessories = () => {
    const navigate = useNavigate()
    return (
    <div>Updateaccessories
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    </div>
  )
}

export default Updateaccessories