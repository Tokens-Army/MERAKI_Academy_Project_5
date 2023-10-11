import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Location from "../Location/Location";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Review from "../Review/Review";

const steps = ["Add cleaning time", "Add your Location", "Review your order"];

function getStepContent(step) {
  const order_id = useSelector((state) => {
    return state.order.order.id;
  });
  switch (step) {
    case 0:
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["StaticDateTimePicker"]}>
            <DemoItem>
              <StaticDateTimePicker
                defaultValue={dayjs("2023-10-10T15:30")}
                onChange={(value) => {
                  const selectedDate = String(value.$d).split(" ");
                  selectedDate.splice(5, 2);
                  axios
                    .put(
                      `http://localhost:5000/orders/update_time/${order_id}`,
                      {
                        scheduled_time: selectedDate.join(" "),
                      }
                    )
                    .then((res) => {})
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      );
    case 1:
      return <Location />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function ResponsiveDateTimePickers() {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              navigate("/cart")
              
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
    </>
  );
}
