// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Box,
//   Avatar,
//   Typography,
// } from "@mui/material";
// import { MdOutlineLiveHelp } from "react-icons/md";
// import LokSevaAayugLogo from "./loksevaaayug.png";
// import { AiOutlineHome } from "react-icons/ai";
// import { RiInformationFill } from "react-icons/ri";
// import { MdOutlineContactPhone } from "react-icons/md";
// import AdminLogo from "./adminLogo.png";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const [openHeading, setOpenHeading] = useState(false);

//   const navigate = useNavigate();

//   return (
//     <Drawer
//       anchor="left"
//       open
//       variant="persistent" // Always persistent to keep the sidebar open on all screens
//       sx={{
//         width: 260,
//         "& .MuiDrawer-paper": {
//           width: 260,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         },
//       }}
//     >
//       {/* Sidebar Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "20px 0",
//           borderBottom: "1px solid #E0E0E0",
//         }}
//       >
//         <Avatar
//           src={LokSevaAayugLogo}
//           alt="Logo"
//           sx={{ marginRight: "10px" }}
//         />
//         <Typography variant="h6" fontWeight="bold">
//           CGPSC
//         </Typography>
//       </Box>

//       {/* Scrollable Menu Section */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//         }}
//       >
//         <List>
//           <ListItem button>
//             <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
//               <AiOutlineHome size={24} />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           <ListItem button>
//             <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
//               <RiInformationFill size={24} />
//             </ListItemIcon>
//             <ListItemText primary="About" />
//           </ListItem>

//           <ListItem button>
//             <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
//               <MdOutlineContactPhone size={24} />
//             </ListItemIcon>
//             <ListItemText primary="Contacts" />
//           </ListItem>

//           <ListItem button>
//             <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
//               <MdOutlineLiveHelp size={24} />
//             </ListItemIcon>
//             <ListItemText primary="Help" />
//           </ListItem>

//         </List>
//       </Box>

//       {/* Sidebar Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           padding: "20px",
//           borderTop: "1px solid #E0E0E0",
//         }}
//       >
//         <Avatar src={AdminLogo} alt="User" sx={{ marginRight: "10px" }} />
//         <Box>
//           <Typography variant="body1">Admin</Typography>
//           <Typography variant="caption">Invigilator</Typography>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;

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
} from "@mui/material";
import { MdOutlineLiveHelp } from "react-icons/md";
import LokSevaAayugLogo from "./loksevaaayug.png";
import { AiOutlineHome } from "react-icons/ai";
import { RiInformationFill } from "react-icons/ri";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaBars } from "react-icons/fa"; // React Icons se hamburger icon liya gaya hai
import AdminLogo from "./adminLogo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      {/* AppBar for Mobile Screens */}
      {/* <AppBar position="fixed" sx={{ display: { xs: "block", md: "none" } }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <FaBars size={24} /> 
          </IconButton>

         
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={LokSevaAayugLogo}
              alt="Logo"
              sx={{ marginRight: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              CGPSC
            </Typography>
          </Box>
        </Toolbar>
      </AppBar> */}

      <AppBar
        sx={{
          backgroundColor: "white",
          display: { xs: "block", md: "none" },
          flexDirection: { xl: "row", lg: "row" },
          justifyContent: { xl: "center", lg: "center", md: "column" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xl: "70%", lg: "80%" },
          }}
        >
          <Stack>
            {/* Ensure the onClick is added to open sidebar */}
            {/* <GiHamburgerMenu color="green" size={32} onClick={toggleSidebar} /> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <FaBars size={32} color="green" />{" "}
              {/* React Icon se FaBars use kiya gaya hai */}
            </IconButton>
          </Stack>
          <Stack
            sx={{
              height: { sm: "40px", xs: "40px" },
              width: { sm: "100%", xs: "100%" },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { xs: "13px", sm: "16px" },
              }}
            >
              <img
                src={LokSevaAayugLogo}
                alt="logo"
                style={{ height: "32px", width: "32px", marginRight: "8px" }}
              />{" "}
              Chhattisgarh Public Service Commission
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer Sidebar for Mobile */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "block", md: "none" }, // Drawer only for mobile screens
          "& .MuiDrawer-paper": {
            width: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Avatar
            src={LokSevaAayugLogo}
            alt="Logo"
            sx={{ marginRight: "10px" }}
          />
          <Typography variant="h6" fontWeight="bold">
            CGPSC
          </Typography>
        </Box>

        {/* Scrollable Menu Section */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <List>
            <ListItem button onClick={() => navigate("/home")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <AiOutlineHome size={24} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={() => navigate("/about")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <RiInformationFill size={24} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem button onClick={() => navigate("/contacts")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <MdOutlineContactPhone size={24} />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>

            <ListItem button onClick={() => navigate("/help")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <MdOutlineLiveHelp size={24} />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </Box>

        {/* Sidebar Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderTop: "1px solid #E0E0E0",
          }}
        >
          <Avatar src={AdminLogo} alt="User" sx={{ marginRight: "10px" }} />
          <Box>
            <Typography variant="body1">Admin</Typography>
            <Typography variant="caption">Invigilator</Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Persistent Sidebar for Desktop */}
      <Drawer
        anchor="left"
        open
        variant="persistent"
        sx={{
          display: { xs: "none", md: "block" }, // Sidebar always open on desktop
          width: 260,
          "& .MuiDrawer-paper": {
            width: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Avatar
            src={LokSevaAayugLogo}
            alt="Logo"
            sx={{ marginRight: "10px" }}
          />
          <Typography variant="h6" fontWeight="bold">
            CGPSC
          </Typography>
        </Box>

        {/* Scrollable Menu Section */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <List>
            <ListItem button onClick={() => navigate("/home")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <AiOutlineHome size={24} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={() => navigate("/about")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <RiInformationFill size={24} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem button onClick={() => navigate("/contacts")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <MdOutlineContactPhone size={24} />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>

            <ListItem button onClick={() => navigate("/help")}>
              <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
                <MdOutlineLiveHelp size={24} />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </Box>

        {/* Sidebar Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderTop: "1px solid #E0E0E0",
          }}
        >
          <Avatar src={AdminLogo} alt="User" sx={{ marginRight: "10px" }} />
          <Box>
            <Typography variant="body1">Admin</Typography>
            <Typography variant="caption">Invigilator</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
