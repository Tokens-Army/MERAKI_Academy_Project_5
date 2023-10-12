import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { setLogin, setUserId, setRoleId } from "../../service/redux/loginSlice";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Wash My Ride
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // login with google
  const responseGoogle = (codeResponse) => {
    const decoded = decodeToken(codeResponse.credential);
    const userData = {
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      password: decoded.sub,
    };
    const { firstName, lastName, email, password } = userData;
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then(async (loginResult) => {
        if (loginResult.data.success) {
          dispatch(setLogin(loginResult.data.token));
          dispatch(setUserId(loginResult.data.userId));
          dispatch(setRoleId(loginResult.data.roleId));
          if (loginResult.data.roleId == 2) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          console.log(loginResult);
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.message === `The email doesn’t exist`
        ) {
          console.log(err.response.data);
          registerHandler(userData);
        } else {
          setMessage("Error happened while Login, please try again");
        }
      });
  };

  // sign up button function
  const registerHandler = (userData = {}) => {
    if (userData !== null) {
      const { firstName, lastName, email, password } = userData;
    }
    if (firstName && lastName && email && password) {
      if (
        email.includes("@gmail.com") ||
        email.includes("@yahoo.com") ||
        email.includes("@hotmail.com") ||
        email.includes("@outlook.com")
      ) {
        if (password.length >= 8) {
          axios
            .post("http://localhost:5000/users/register", {
              firstName,
              lastName,
              email,
              password,
              role_id: 1,
            })
            .then((result) => {
              if (result.data) {
                setMessage("");
                axios
                  .post("http://localhost:5000/users/login", {
                    email,
                    password,
                  })
                  .then((loginResult) => {
                    if (loginResult.data) {
                      dispatch(setLogin(loginResult.data.token));
                      dispatch(setUserId(loginResult.data.userId));
                      dispatch(setRoleId(loginResult.data.roleId));
                      if (loginResult.data.roleId == 2) {
                        navigate("/admin");
                      } else {
                        navigate("/");
                      }
                    }
                  })
                  .catch((err) => {
                    setMessage("Error happened while Login, please try again");
                  });
              }
            })
            .catch((err) => {
              if (err.response && err.response.data) {
                return setMessage(err.response.data.message);
              }
              setMessage("Error happened while Login, please try again");
            });
        } else {
          setMessage("Password must be at least 8 characters");
        }
      } else {
        setMessage("Email must be example@example.com");
      }
    } else {
      setMessage("Fill all the blank please");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {status
              ? message && <Typography color="primary">{message}</Typography>
              : message && <Typography color="error">{message}</Typography>}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={registerHandler}
            >
              Sign Up
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  setMessage("Login Failed");
                }}
              />
            </div>
            <br />
            <Grid container justifyContent="flex-end">
              <Grid container>
                <Typography>
                  Already have an account?
                  <Link to="/login" variant="body2">
                    {" "}
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
