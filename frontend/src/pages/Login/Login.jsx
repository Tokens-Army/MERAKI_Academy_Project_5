import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUserId } from "../../service/redux/loginSlice";
import "./login.css";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const loginHandler = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        setMessage("");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  return (
    <div>
      <div>
        <h4 className="loginTitle">Login</h4>
      </div>
      <div className="login-inputs">
        <input
          type="email"
          placeholder="Your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div className="loginMessageDiv">
        {status
          ? message && <div className="successMsg">{message}</div>
          : message && <div className="errorMsg">{message}</div>}
      </div>
      <br />
      <div className="loginBtnDiv">
        <button className="loginBtn" onClick={loginHandler}>
          Login
        </button>
      </div>
      <br />
      <div>
        <span>don't have an account ?</span>
        <br />
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
