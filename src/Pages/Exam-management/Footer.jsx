

import React from "react";
import { AppBar, Toolbar, Stack, Typography } from "@mui/material";
import { SlHome } from "react-icons/sl";
import { TbLayout2 } from "react-icons/tb";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const Footer = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    // window.location.href = "/management";
    navigate("/management");
  };

  const handleLayout = () => {
    navigate("/layout");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%",
        height: "70px", // Increased height for icons and text
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none", // Remove shadow to eliminate border
        borderTop: "none", // Ensure there's no border at the top
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          width: { xl: "70%", lg: "80%", md: "90%", sm: "100%", xs: "100%" },
        }}
      >
        <Stack
          direction="row"
          spacing={5} // Add spacing between the icon groups
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Home Icon and Text */}
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            onClick={handleHome}
            sx={{ cursor: "pointer" }}
          >
            <SlHome color="#13661e" size={24} />
            <Typography variant="caption" color="black">
              Home
            </Typography>
          </Stack>

          {/* Layout Icon and Text */}
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            onClick={handleLayout}
            sx={{ cursor: "pointer" }}
          >
            <TbLayout2 color="#13661e" size={24} />
            <Typography variant="caption" color="black">
              Layout
            </Typography>
          </Stack>

          {/* Chatbot Icon and Text */}
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Chatbot />
            <Typography variant="caption" color="black">
              Chatbot
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
