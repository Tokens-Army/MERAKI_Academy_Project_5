import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accessories.css";
// import { Card } from "react-bootstrap";
import { Await, useLoaderData } from "react-router-dom";
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
const defaultTheme = createTheme();
const Accessories = () => {
  const { result } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={3}>
              <Suspense fallback={<>Loading...</>}>
                <Await
                  resolve={result}
                  errorElement={<>Error Loading data refresh please</>}
                >
                  {(result) => {
                    return result.map((accessory) => {
                      return (
                        <Grid item key={accessory.id} xs={12} sm={6} md={6}>
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
                              image={accessory.img}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {accessory.name}
                              </Typography>
                              <Typography>{accessory.description}</Typography>
                              <Typography
                                component="h2"
                                variant="h3"
                                color="grey"
                              >
                                {accessory.price}JD
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="large" style={{ left: "40%" }}>
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
export const accessoriesLoader = async () => {
  const result = axios
    .get("http://localhost:5000/accessories")
    .then((result) => {
      // console.log(result.data.result);
      return result.data.result;
    });
  return { result };
};
export default Accessories;
// <div className="productinfocategory">
//   <div className="container">
//     <img
//       className="accessoryImg"
//       alt="Avatar"
//       src={accessory.img}
//     />
//     <div className="middle">
//       <div onClick={() => {}} className="text">
//         Add {accessory.name} To Cart
//       </div>
//     </div>
//   </div>
//   <div className="productName">{accessory.name}</div>
//   <div className="productPrice">{accessory.price} JD</div>
//   <img
//     className="addtocart2"
//     src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA="
//     onClick={() => {}}
//   />
// </div>
