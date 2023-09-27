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
      <div></div>
      <img className="logoImg" src="../../../img.png" onClick={()=>{
        navigate("/")
      }} />
      
      <h4 className="loginCheckText">Already have accout?</h4>
      <button onClick={()=>{
        navigate("/login")
      }}className="LoginButtonRegisterPage">Log In</button>
    </div>
    
     <div className="registerMiddlePage">
      
    <div id="login-box">
  <div className="left">
    <h1 className="h1register">Sign up</h1>
    
    <input  type="text" onChange={(e)=>{
      setFirstName(e.target.value)
    }}  placeholder="First Name" />
    <input  type="text" onChange={(e)=>{
      setLastName(e.target.value) 
    }}  placeholder="Last Name" />
    <input type="text"  onChange={(e)=>{
      setEmail(e.target.value)
    }}   placeholder="E-mail" />
    <input type="password" onChange={(e)=>{
      setPassword(e.target.value)
    }}  placeholder="Password" />
    <input type="password" onChange={(e)=>{
      setCheckPassword(e.target.value)
    }}  placeholder="Retype password" />
    
    <input type="submit" onClick={()=>{
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
        navigate("/login")
      })
      .catch((err)=>{
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message)
      })
    }}} className="registerbuttonRegister" value="Sign me up" />
  </div>
  
  <div className="right">
    <span className="loginwith">Sign in with<br />social network</span>
    <a target="_blank" href="https://www.facebook.com/login/">
    <button className="social-signin facebook" >Log in with facebook</button>
    </a>
    <a target="_blank" href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiYXIifQ%3D%3D%22%7D">
    <button className="social-signin twitter">Log in with Twitter</button>
    </a>
    <a target="_blank" href="https://accounts.google.com/InteractiveLogin/signinchooser?elo=1&ifkv=AYZoVhekNAfjAWCMyCkafk6vcFXKx3rEmf6LUzlkOVAB2n3chxQ94kF6938hWvUt3sFFQ2sPM-R0yA&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
    <button className="social-signin google">Log in with Google+</button>
    </a>
    <div className="SuccessOrErrorMessage">
    {succcesMessage&&<>{navigate("/login")}</>}
    {errorMessage&&<>{errorMessage}</>}
    </div>
  </div>
  <div className="or">OR</div>
</div>

    <img className="rightImg"src="https://st.depositphotos.com/1203257/4886/i/450/depositphotos_48867585-stock-photo-summer-car-washing.jpg"/>
    </div>
    
  </div>;
};

export default Register;