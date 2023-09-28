import React,{Suspense} from 'react'
import { useNavigate } from 'react-router-dom'
import { Await,useLoaderData } from 'react-router-dom'
import axios from 'axios'
import "./Deleteadmins.css"
const Deleteadmins = () => {
    const navigate = useNavigate()
    const {result}=useLoaderData()
    return (
    <div>Deleteadmins
        <button onClick={()=>{
        navigate("/admin")
    }}>Back to home page</button>
    <div className="adminAccountCardAll">
        
        <Suspense fallback={<>Loading...</>}>
          <Await
            resolve={result}
            errorElement={<>Error Loading data refresh please</>}
          >
            {(result) => {
              return result.map((user) => {
                return (
                  <div className="adminaccountinfo">
                  <div>{user.firstname}</div>
                  <div>{user.lastname}</div>
                  <div>{user.email}</div>
                  <div>Admin</div>
                  <div className='deleteadminaccountbutton' onClick={()=>{
                    axios.put(`http://localhost:5000/users/delete/${user.id}`)
                    .then((result)=>{
                        console.log(result);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                  }}>❌</div>
                  </div>
                );
              });
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
export const deleteAdminLoader = async()=>{
    const result = axios
    .get ("http://localhost:5000/users")
    .then((result)=>{
        return result.data.admins
    })
    return {result}
}
export default Deleteadmins