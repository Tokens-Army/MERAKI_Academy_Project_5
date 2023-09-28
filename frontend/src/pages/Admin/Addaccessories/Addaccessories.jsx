import React from 'react'
import { useNavigate } from 'react-router-dom'

const Addaccessories = () => {
  const navigate = useNavigate()
    return (
    <div>Addaccessories

    <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    </div>
  )
}

export default Addaccessories