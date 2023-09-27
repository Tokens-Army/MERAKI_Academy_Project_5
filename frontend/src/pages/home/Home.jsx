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
import { useSelector } from "react-redux";

const defaultTheme = createTheme();

const Home = () => {
  const { result } = useLoaderData();
  const token = useSelector((state) => {
    return state.login.token;
  });
  const navigate = useNavigate();
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={3}>
              <Suspense fallback={<>loading......</>}>
                <Await resolve={result} errorElement={<>error .....</>}>
                  {(result) => {
                    return result.map((service) => {
                      return (
                        <Grid item key={service.id} xs={12} sm={6} md={6}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                // 16:9
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
                              >
                                {service.price}JD
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                size="large"
                                style={{ left: "40%" }}
                                onClick={() => {
                                  axios
                                    .post(
                                      `http://localhost:5000/orders/${service.id}`,
                                      "",
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((result) => {
                                      console.log(result);
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
