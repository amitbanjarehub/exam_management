import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import NoDataImage from "./layout.png"; // Path to your image

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          <CardContent > {/* Reduce paddingBottom */}
            <Typography variant="h6" color="textSecondary">
              My Layout Page
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={NoDataImage} // Using the imported image
            alt="No Data Found"
            sx={{
              height: 460, // Adjust height as needed
              objectFit: "contain", // Keep aspect ratio
              marginTop: "-8px",  // Optional: To bring the image closer to the content
            }}
          />
        </Card>
      </Box>
    </>
  );
};

export default Layout;
