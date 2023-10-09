import React, { Suspense } from "react";
import axios from "axios";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../service/redux/orderSlice";

const defaultTheme = createTheme();

const Home = () => {

  const dispatch = useDispatch();
  const { result } = useLoaderData();
  const token = useSelector((state) => {
    return state.login.token;
  });

  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "80%" }}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Container sx={{ py: 3 }} maxWidth="xl">
            <Grid container spacing={4} m>
              <Suspense fallback={<>loading......</>}>
                <Await resolve={result} errorElement={<>error .....</>}>
                  {(result) => {
                    return result.map((service) => {
                      return (
                        <Grid item key={service.id} ml={7} md={5}>
                          <Card
                            className="CARDS"
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                              borderRadius: "10px",
                              transition: "0.3s",
                              p: 2,
                            }}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                pt: "56.25%",
                              }}
                              image={service.img}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {service.name}
                              </Typography>
                              <Typography>{service.description}</Typography>
                              <Typography
                                component="h2"
                                variant="h3"
                                color="grey"
                                mt="1%"
                              >
                                {service.price}JD
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                size="large"
                                style={{ left: "40.5%" }}
                                variant="contained"
                                onClick={() => {
                                  axios
                                    .post(
                                      `http://localhost:5000/orders/${service.id}`,
                                      { total_price: service.price },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((result) => {
                                      localStorage.setItem(
                                        "order",
                                        JSON.stringify(result.data.service[0])
                                      );
                                      dispatch(
                                        setOrder(result.data.service[0])
                                      );
                                      navigate("/accessories");
                                    })
                                    .catch((err) => {
                                      navigate("/login");
                                    });
                                }}
                              >
                                Select
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    });
                  }}
                </Await>
              </Suspense>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
};

export const serviceLoader = async () => {
  const result = axios.get("http://localhost:5000/services").then((result) => {
    return result.data.services;
  });
  return { result };
};

export default Home;
