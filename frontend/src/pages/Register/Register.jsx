import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import axios from "axios";
const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [succcesMessage, setSucccesMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate=useNavigate()
  return <div className="RegisterPage">
    <div className="RegisterNavBar">
      <div>Logo</div>
      <div>Wash me</div>
      <h4>Already have accout?</h4>
      <button className="LoginButtonRegisterPage">Log In</button>
    </div>

    <div className="registerMiddlePage">
    <div></div>
    <div className="registerComponents">
    <h4>Register</h4>
    <input className="inputRegister firstName" onChange={(e)=>{
      setFirstName(e.target.value)
    }} placeholder="First Name"/>
    <input className="inputRegister lastName" onChange={(e)=>{
      setLastName(e.target.value)
    }} placeholder="Last Name"/>
    <input className="inputRegister email" onChange={(e)=>{
      setEmail(e.target.value)
    }} placeholder="Email"/>
    <input className="inputRegister password" type="password" onChange={(e)=>{
      setPassword(e.target.value) 
    }} placeholder="Password"/>
    <input className="inputRegister password" type="password" onChange={(e)=>{
      setCheckPassword(e.target.value) 
    }} placeholder="Re-type Password"/>
    
    <button onClick={()=>{
      if (password!==checkPassword){
        return setErrorMessage("Password does not match")
      }else{
      axios.post("http://localhost:5000/users/register",{
        firstName,
        lastName,
        email,
        password,
        role_id:1
      })
      .then((results)=>{
        console.log(results.data.result);
        setSucccesMessage(results.data.result)
      })
      .catch((err)=>{
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message)
      })
    }}} className="RegisterButton">Register</button>
    </div>

    <div></div>
    </div>
    <div className="SuccessOrErrorMessage">
    {succcesMessage&&<>{navigate("/login")}</>}
    {errorMessage&&<>{errorMessage}</>}
    </div>
    
  </div>;
};

export default Register;
