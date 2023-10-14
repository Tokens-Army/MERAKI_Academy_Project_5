import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accessories.css";
import { Await, useLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10%",
};

const Accessories = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [accessoryId, setAccessoryId] = useState(0);
  const handleOpen = () => setOpen(true);
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
    <>
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
            <Container className="home-container" sx={{ py: 3 }} maxWidth="xl">
              <Typography variant="h4">
                You can choose an accessory with your order!
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
              <Suspense fallback={<Loader />}>
                <div
                  className="all-accessories"
                  // container
                  // spacing={4}
                  // sx={{
                  //   width: "100%",
                  //   justifyContent: "center",
                  //   alignItems: "space-around",
                  // }}
                >
                  <Await
                    resolve={result}
                    errorElement={<>Error Loading data refresh please</>}
                  >
                    {(result) => {
                      return result.map((accessory) => {
                        return (
                          <Grid item key={accessory?.id} ml={5} md={5}>
                            <Card
                              className="CARDS"
                              sx={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                                transition: "0.3s",
                                borderRadius: "10px",
                                p: 2,
                                // backgroundColor: "#f1eaea",
                              }}
                            >
                              <img
                                src={accessory.img}
                                style={{ height: "30vh" }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                  sx={{ minHeight: "8vh" }}
                                >
                                  {accessory.name}
                                </Typography>
                                {/* <Typography sx={{ minHeight: "18vh" }}>
                                {accessory.description}
                              </Typography> */}
                                {accessory.id === accessoryId && (
                                  <Modal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <Typography>
                                        {accessory.description}
                                      </Typography>
                                    </Box>
                                  </Modal>
                                )}
                                <Typography
                                  component="h2"
                                  variant="h3"
                                  color="grey"
                                >
                                  {accessory.price}JD
                                </Typography>
                              </CardContent>
                              <CardActions className="accessory-buttons">
                                <Button
                                  size="large"
                                  variant="contained"
                                  // style={{ left: "37%" }}
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
                                <Button
                                  onClick={() => {
                                    setOpenModal(true);
                                    setAccessoryId(accessory.id);
                                  }}
                                >
                                  description
                                </Button>
                              </CardActions>
                            </Card>
                          </Grid>
                        );
                      });
                    }}
                  </Await>
                </div>
              </Suspense>
            </Container>
          </main>
        </ThemeProvider>
      </div>
    </>
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
