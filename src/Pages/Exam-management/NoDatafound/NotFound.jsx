import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import NoDataImage from "./imgaeNotFound.png"; // Path to your image

const NotFound = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   height: '100vh', // Full height of the screen
          width: "100%",
          padding: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 345, // Adjust card width for mobile screens
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            image={NoDataImage} // Using the imported image
            alt="No Data Found"
            sx={{
              height: 200, // Adjust height as needed
              objectFit: "contain", // Keep aspect ratio
            }}
          />
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              No Data Found
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default NotFound;
