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

// TODO remove, this demo shouldn't need to reset the theme.

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
      password: decoded.jti,
    };
    const { firstName, lastName, email, password } = userData;
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
      } else {
        registerHandler(firstName, lastName, email, password);
      }
    })
    .catch((err) => {
      setMessage("Error happened while Login, please try again");
    });
  };

  // sign up button function
  const registerHandler = (firstName, lastName, email, password) => {
    console.log(firstName, lastName, email, password);
    axios
      .post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        email,
        password,
        role_id: 1,
      })
      .then((result) => {
        console.log(result);
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
        console.log(err);
      });
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
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                setMessage("Login Failed");
              }}
            />
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
