import React,{useState} from "react";
import "./Register.css"
const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    <input className="inputRegister password" onChange={(e)=>{
      setPassword(e.target.value)
    }} placeholder="Password"/>
    <button className="RegisterButton">Register</button>
    </div>

    <div></div>
    </div>
    
    
  </div>;
};

export default Register;
