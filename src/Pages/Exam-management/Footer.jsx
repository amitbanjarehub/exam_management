import React from "react";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%", // Make sure the footer spans the entire screen width
        height: "64px", // Height matches AppHeader
        backgroundColor: "white",
        boxShadow: "none", // Remove any shadow from the footer
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          width: { xl: "70%", lg: "80%", md: "90%", sm: "100%" }, // Same as AppHeader
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained">First</Button>
          <Button variant="contained">Second</Button>
          <Button variant="contained">Third</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
