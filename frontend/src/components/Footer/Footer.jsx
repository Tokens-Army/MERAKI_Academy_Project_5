import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976D2",
        color: "#fff",
        py: 3,
        boxShadow: (theme) =>
          `0 -${theme.spacing(1)} ${theme.spacing(2)} rgba(0, 0, 0, 0.3)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 1 }}>
          <Link
            to="/About"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography variant="subtitle1" align="center">
              About Us
            </Typography>
          </Link>
          <Link
            to="/contact-us"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography variant="subtitle1" align="center">
              Contact Us
            </Typography>
          </Link>
        </Box>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Wash My Ride
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
