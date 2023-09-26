import React, { Suspense } from "react";
import axios from "axios";
import { Await, useLoaderData } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const cards = [1, 2, 3, 4];
const defaultTheme = createTheme();
const Home = () => {
  const { result } = useLoaderData();

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
                              width:"100%"
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
                              <Button size="small">View</Button>
                              <Button size="small">Edit</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    });
                    // return result.map((service) => {
                    //   return (
                    //     <div key={service.id}>
                    //       {service.name}
                    //       <>{/* <img src={service.img} /> */}</>
                    //     </div>
                    //   );
                    // });
                  }}
                  {/* {cards.map((card) => (
                    
                  ))} */}
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
