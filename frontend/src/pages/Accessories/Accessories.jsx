import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accessories.css";
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
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import Loader from "../../assets/Animations/Loader.jsX";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

const Accessories = () => {
  const [open, setOpen] = useState(false);

  const order = useSelector((state) => {
    return state.order.order;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { result } = useLoaderData();

  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "80%" }}>
      <Stack spacing={2} sx={{ width: "10%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Added to your order!
          </Alert>
        </Snackbar>
      </Stack>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Container sx={{ py: 3 }} maxWidth="xl">
            <Typography variant="h4">
              Choose an accessory with your order!
            </Typography>
            <br />
            <Button
              sx={{ mb: "1%" }}
              className="next-button"
              style={{}}
              variant="contained"
              onClick={() => {
                navigate("/scheduleorder");
              }}
            >
              NEXT
            </Button>
            <Grid container spacing={4}>
              <Suspense fallback={<Loader />}>
                <Await
                  resolve={result}
                  errorElement={<>Error Loading data refresh please</>}
                >
                  {(result) => {
                    return result.map((accessory) => {
                      return (
                        <Grid item key={accessory?.id} ml={10} md={5}>
                          <Card
                            className="CARDS"
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                              transition: "0.3s",
                              borderRadius: "10px",
                              p: 2,
                            }}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                pt: "100%",
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
                              <Button
                                size="large"
                                variant="contained"
                                style={{ left: "40.5%" }}
                                onClick={() => {
                                  axios
                                    .post(
                                      `http://localhost:5000/orders/${order.id}/${accessory.id}`
                                    )
                                    .then((result) => {
                                      setOpen(true);
                                    })
                                    .catch((err) => {
                                      console.log(err);
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

export const accessoriesLoader = async () => {
  const result = axios
    .get("http://localhost:5000/accessories")
    .then((result) => {
      return result.data.result;
    })
    .catch((err) => {
      console.log(err);
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
