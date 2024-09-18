// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
//   Box,
//   Avatar,
//   Typography,
// } from "@mui/material";
// import { MdExpandLess, MdExpandMore } from "react-icons/md";
// import LokSevaAayugLogo from "../loksevaaayug.png";
// import AdminLogo from "./adminLogo.png";
// import { MdOutlineLiveHelp } from "react-icons/md";

// const Sidebar = ({ open, toggleSidebar }) => {
//   const [openHeading, setOpenHeading] = useState(false);

//   const handleClick = () => {
//     setOpenHeading(!openHeading);
//   };

//   return (
//     <Drawer
//       anchor="left"
//       open={open}
//       onClose={toggleSidebar}
//       sx={{
//         width: 260,
//         "& .MuiDrawer-paper": {
//           width: 260,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between", // Ensure header stays at the top and footer stays at the bottom
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
//           flexGrow: 1, // Allow this section to grow and take available space
//           overflowY: "auto", // Enable scrolling for the menu items
//         }}
//       >
//         <List>
//           <ListItem button onClick={handleClick}>
//             <ListItemText primary="Main Heading" />
//             {openHeading ? <MdExpandLess /> : <MdExpandMore />}
//           </ListItem>
//           <Collapse in={openHeading} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button>
//                 <ListItemText primary="Subheading 1" />
//               </ListItem>
//               <ListItem button>
//                 <ListItemText primary="Subheading 2" />
//               </ListItem>
//             </List>
//           </Collapse>
//           <ListItem button>
//             <ListItemText primary="Customers" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Projects" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Resources" />
//           </ListItem>
//           <ListItem button>
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
  Collapse,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { MdExpandLess, MdExpandMore, MdOutlineLiveHelp } from "react-icons/md";
import LokSevaAayugLogo from "../loksevaaayug.png";
import { AiOutlineHome } from "react-icons/ai";
import { RiInformationFill } from "react-icons/ri";
import { MdOutlineContactPhone } from "react-icons/md";
import AdminLogo from "./adminLogo.png";

const Sidebar = ({ open, toggleSidebar }) => {
  const [openHeading, setOpenHeading] = useState(false);

  const handleClick = () => {
    setOpenHeading(!openHeading);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
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
          {/* <ListItem button onClick={handleClick}>
            <ListItemIcon
              sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
            >
              <MdOutlineLiveHelp size={24} />
            </ListItemIcon>
            <ListItemText primary="Main Heading" />
            {openHeading ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>

          <Collapse
            in={openHeading}
            timeout="auto"
            unmountOnExit
            // sx={{ border: "1px solid red" }}
          >
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemIcon
                  sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
                >
                  <MdOutlineLiveHelp size={20} />{" "}
                 
                </ListItemIcon>
                <ListItemText primary="Subheading 1" />
              </ListItem>
              <ListItem button>
                <ListItemIcon
                  sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
                >
                  <MdOutlineLiveHelp size={20} />{" "}
                 
                </ListItemIcon>
                <ListItemText primary="Subheading 2" />
              </ListItem>
            </List>
          </Collapse> */}

          <ListItem button>
            <ListItemIcon
              sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
            >
              <AiOutlineHome size={24} /> {/* Adjust the icon size here */}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button>
            <ListItemIcon
              sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
            >
              <RiInformationFill size={24} /> {/* Adjust the icon size here */}
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>

          <ListItem button>
            <ListItemIcon
              sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
            >
              <MdOutlineContactPhone size={24} />{" "}
              {/* Adjust the icon size here */}
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>

          <ListItem button>
            <ListItemIcon
              sx={{ minWidth: "40px", mr: 0 }} // Adjust the margin here to change the gap
            >
              <MdOutlineLiveHelp size={24} /> {/* Adjust the icon size here */}
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
  );
};

export default Sidebar;
