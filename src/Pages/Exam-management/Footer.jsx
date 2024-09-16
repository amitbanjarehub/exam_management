import React from "react";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { SlHome } from "react-icons/sl";
import { TbLayout2 } from "react-icons/tb";
import { BsChatDots } from "react-icons/bs";

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
          width: { xl: "70%", lg: "80%", md: "90%", sm: "100%", xs: "100%" }, // Same as AppHeader
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            // border: "1px solid red",
          }}
        >
          {/* <Button variant="contained">First</Button> */}
          <SlHome color="black" size={24} />
          {/* <Button variant="contained">Second</Button> */}
          <TbLayout2 color="black" size={24} />
          {/* <Button variant="contained">Third</Button> */}
          <BsChatDots color="black" size={24} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
