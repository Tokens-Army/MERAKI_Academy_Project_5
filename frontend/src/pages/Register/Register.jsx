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
      <img className="logoImg" src="../../../imgg.png" onClick={()=>{
        navigate("/")
      }} />
      
      <h4 className="loginCheckText">Already have accout?</h4>
      <button onClick={()=>{
        navigate("/login")
      }}className="LoginButtonRegisterPage">Log In</button>
    </div>
    
     <div className="registerMiddlePage">
      <img className="rightImg" src="https://hips.hearstapps.com/hmg-prod/images/woman-wiping-down-steering-wheel-royalty-free-image-1656075655.jpg"/>
    {/* <div className="registerComponents">
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
    </div>  */}
    <div id="login-box">
  <div class="left">
    <h1>Sign up</h1>
    
    <input  type="text" onChange={(e)=>{
      setFirstName(e.target.value)
    }} name="username" placeholder="First Name" />
    <input  type="text" onChange={(e)=>{
      setLastName(e.target.value)
    }} name="lastName" placeholder="Last Name" />
    <input type="text"  onChange={(e)=>{
      setEmail(e.target.value)
    }} name="email"  placeholder="E-mail" />
    <input type="password" onChange={(e)=>{
      setPassword(e.target.value)
    }} name="password" placeholder="Password" />
    <input type="password" onChange={(e)=>{
      setCheckPassword(e.target.value)
    }} name="password2" placeholder="Retype password" />
    
    <input type="submit" name="signup_submit" value="Sign me up" />
  </div>
  
  <div class="right">
    <span class="loginwith">Sign in with<br />social network</span>
    <a target="_blank" href="https://www.facebook.com/login/">
    <button class="social-signin facebook" >Log in with facebook</button>
    </a>
    <a target="_blank" href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiYXIifQ%3D%3D%22%7D">
    <button class="social-signin twitter">Log in with Twitter</button>
    </a>
    <a target="_blank" href="https://accounts.google.com/InteractiveLogin/signinchooser?elo=1&ifkv=AYZoVhekNAfjAWCMyCkafk6vcFXKx3rEmf6LUzlkOVAB2n3chxQ94kF6938hWvUt3sFFQ2sPM-R0yA&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
    <button class="social-signin google">Log in with Google+</button>
    </a>
  </div>
  <div class="or">OR</div>
</div>

    {/* <img className="rightImg"src="http://www.animated-gifs.fr/category_transportation/cars-wash/09681050.gif"/> */}
    </div>
    <div className="SuccessOrErrorMessage">
    {succcesMessage&&<>{navigate("/login")}</>}
    {errorMessage&&<>{errorMessage}</>}
    </div>
    
  </div>;
};

export default Register;
