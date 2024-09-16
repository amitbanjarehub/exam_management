import React from "react";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { SlHome } from "react-icons/sl";
import { TbLayout2 } from "react-icons/tb";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/management");
  };

  const handleLayout = () => {
    navigate("/layout");
  };

  const handleChatbot = () => {
    navigate("/chatbot");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%", // Make sure the footer spans the entire screen width
        height: "36px", // Height matches AppHeader
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid green",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.4)", // Shadow on the top side
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          width: { xl: "70%", lg: "80%", md: "90%", sm: "100%", xs: "100%" }, // Same as AppHeader
          // border: "1px solid red",
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
          <SlHome color="black" size={24} onClick={handleHome} />
          {/* <Button variant="contained">Second</Button> */}
          <TbLayout2 color="black" size={24} onClick={handleLayout} />
          {/* <Button variant="contained">Third</Button> */}
          <BsChatDots color="black" size={24} onClick={handleChatbot} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
