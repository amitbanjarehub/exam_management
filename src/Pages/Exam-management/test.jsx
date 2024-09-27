import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Avatar,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Stack,
  Collapse,
} from "@mui/material";
import { MdExpandLess, MdExpandMore, MdOutlineLiveHelp } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { RiInformationFill, RiAdminFill } from "react-icons/ri";
import { MdOutlineContactPhone } from "react-icons/md";
import { GiDirectorChair } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { FaBars } from "react-icons/fa"; // React Icons से hamburger icon लिया गया है
import { useNavigate } from "react-router-dom";
import LokSevaAayugLogo from "./loksevaaayug.png";
import AdminLogo from "./adminLogo.png";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openDirector, setOpenDirector] = useState(false);
  const [openDistrictAdmin, setOpenDistrictAdmin] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Functions to handle submenu toggle
  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleDirectorClick = () => {
    setOpenDirector(!openDirector);
  };

  const handleDistrictAdminClick = () => {
    setOpenDistrictAdmin(!openDistrictAdmin);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          display: { xs: "block", md: "none" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <FaBars size={32} color="green" />{" "}
          </IconButton>
          <Typography
            sx={{
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={LokSevaAayugLogo}
              alt="logo"
              style={{ height: "32px", width: "32px", marginRight: "8px" }}
            />{" "}
            Chhattisgarh Public Service Commission
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Sidebar for Mobile */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 260,
          },
        }}
      >
        {/* Sidebar Content */}
        <List>
          <ListItem button onClick={handleAdminClick}>
            <ListItemIcon>
              <RiAdminFill size={24} />
            </ListItemIcon>
            <ListItemText primary="Ayog Admin" />
            {openAdmin ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
          <Collapse in={openAdmin} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => navigate("/admin/profile")}>
                <ListItemText primary="Admin Profile" />
              </ListItem>
              <ListItem button onClick={() => navigate("/admin/settings")}>
                <ListItemText primary="Admin Settings" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleDirectorClick}>
            <ListItemIcon>
              <GiDirectorChair size={24} />
            </ListItemIcon>
            <ListItemText primary="Ayog Director" />
            {openDirector ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
          <Collapse in={openDirector} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => navigate("/director/meetings")}>
                <ListItemText primary="Director Meetings" />
              </ListItem>
              <ListItem button onClick={() => navigate("/director/overview")}>
                <ListItemText primary="Director Overview" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleDistrictAdminClick}>
            <ListItemIcon>
              <GrUserAdmin size={24} />
            </ListItemIcon>
            <ListItemText primary="District Admin" />
            {openDistrictAdmin ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
          <Collapse in={openDistrictAdmin} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => navigate("/district/exams")}>
                <ListItemText primary="District Exams" />
              </ListItem>
              <ListItem button onClick={() => navigate("/district/reports")}>
                <ListItemText primary="District Reports" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        {/* Sidebar Footer */}
        <Box sx={{ padding: "20px", borderTop: "1px solid #E0E0E0" }}>
          <Avatar src={AdminLogo} alt="User" sx={{ marginRight: "10px" }} />
          <Typography variant="body1">Admin</Typography>
          <Typography variant="caption">Invigilator</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
