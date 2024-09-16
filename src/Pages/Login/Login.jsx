// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   TextField,
//   Typography,
//   Link,
//   Stack,
//   AppBar,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { FcGoogle } from "react-icons/fc";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// import Logo from "./logo.png";
// import LokSevaAayugLogo from "./loksevaaayug.png";
// import { useNavigate } from "react-router-dom";

// const LoginCard = () => {
//   const [email, setEmail] = useState(""); // State for email input
//   const [password, setPassword] = useState(""); // State for password input
//   const [showPassword, setShowPassword] = useState(false); // State to show/hide password
//   const [errorMessage, setErrorMessage] = useState(""); // State for error message
//   const [open, setOpen] = useState(false);

//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md")); // Detect mobile screens

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async () => {
//     // Perform API call to login
//     try {
//       const response = await fetch("http://localhost:5001/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Login successful
//         console.log("Login successful", data);

//         // Store JWT token (if required)
//         localStorage.setItem("token", data.token);

//         // Navigate to management page
//         navigate("/management");
//       } else {
//         // Handle login error
//         setErrorMessage(data.message || "Invalid login credentials");
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       setErrorMessage("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <Stack>
//       <AppBar
//         sx={{
//           backgroundColor: "white",
//           display: { xl: "flex" },
//           flexDirection: { xl: "row", lg: "row" },
//           justifyContent: { xl: "center", lg: "center", md: "column" },
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: { xl: "70%", lg: "80%" },
//           }}
//         >
//           <Stack
//             sx={{
//               height: { lg: "30px", xl: "36", sm: "28px", xs: "28px" },
//               width: { lg: "120px", xl: "198px", sm: "28px", xs: "28px" },
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             <Typography sx={{ color: "black" }}>
//               <img src={LokSevaAayugLogo} alt="logo" /> Chhattisgarh Public
//               Service Commission
//             </Typography>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       <Box
//         sx={{
//           maxWidth: 400,
//           mx: "auto",
//           p: 4,
//           mt: 5,
//           boxShadow: 3,
//           borderRadius: 2,
//           marginTop: { lg: "10%", xl: "10%", xs: "124px", sm: "224px" },
//           backgroundColor: "white",
//         }}
//       >
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             paddingBottom: "10px",
//           }}
//         >
//           <img
//             src={LokSevaAayugLogo}
//             alt="logo"
//             style={{ height: "80px", width: "80px" }}
//           />
//         </Stack>

//         {/* Display error message if login fails */}
//         {errorMessage && (
//           <Typography color="error" align="center">
//             {errorMessage}
//           </Typography>
//         )}

//         <Stack>
//           <Typography
//             sx={{
//               color: "rgb(100, 116, 139)",
//               fontSize: { lg: "18px", sm: "16px" },
//               fontWeight: "400",
//             }}
//           >
//             Email Id:
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             sx={{ mb: 3, borderRadius: 2 }}
//             placeholder="Enter your email id"
//             size="small"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Stack>

//         <Box sx={{ position: "relative", mb: 3 }}>
//           <Stack>
//             <Typography
//               sx={{
//                 color: "rgb(100, 116, 139)",
//                 fontSize: { lg: "18px", sm: "16px" },
//                 fontWeight: "400",
//               }}
//             >
//               Password:
//             </Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               sx={{ borderRadius: 2 }}
//               size="small"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Stack>
//           <Box
//             onClick={togglePasswordVisibility}
//             sx={{
//               position: "absolute",
//               top: "70%",
//               right: 10,
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//             }}
//           >
//             {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
//           </Box>
//         </Box>

//         <Box sx={{ textAlign: "right", mb: 3 }}>
//           <Link href="#" underline="none" sx={{ color: "#6ec290" }}>
//             Forgot Password?
//           </Link>
//         </Box>

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{
//             mb: 3,
//             textTransform: "none",
//             borderRadius: 2,
//             backgroundColor: "#6ec290",
//           }}
//           size="large"
//           onClick={handleLogin}
//         >
//           Login
//         </Button>

//         <Typography
//           align="center"
//           variant="body2"
//           sx={{
//             fontSize: { lg: "18px", sm: "16px" },
//             fontWeight: "500",
//             lineHeight: { lg: "28px", sm: "26px" },
//             color: "rgb(148, 163, 184)",
//           }}
//         >
//           Don't have a account yet?{" "}
//           <Link
//             href="#"
//             sx={{
//               color: "#6ec290",
//               textDecoration: "none",
//               "&:hover": {
//                 textDecoration: "underline",
//                 textDecorationColor: "black",
//               },
//             }}
//           >
//             Sign up
//           </Link>
//         </Typography>
//       </Box>
//     </Stack>
//   );
// };

// export default LoginCard;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import LokSevaAayugLogo from "./loksevaaayug.png";
import { GiHamburgerMenu } from "react-icons/gi";

const LoginCard = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to show/hide password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const theme = useTheme(); // Get the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile screens

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // const response = await fetch("http://192.168.29.107:5001/api/login", {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/management");
      } else {
        setErrorMessage(data.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <Stack>
      <AppBar
        sx={{
          backgroundColor: "white",
          display: { xl: "flex" },
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
            <GiHamburgerMenu color="green" size={32} />
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
                // border: "1px solid red",
                display: " flex",
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

      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          p: 4,
          mt: 5,
          boxShadow: 3,
          borderRadius: 2,
          marginTop: { lg: "10%", xl: "10%", xs: "124px", sm: "224px" },
          backgroundColor: "white",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <img
            src={LokSevaAayugLogo}
            alt="logo"
            style={{ height: "80px", width: "80px" }}
          />
        </Stack>

        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        <Stack>
          <Typography
            sx={{
              color: "rgb(100, 116, 139)",
              fontSize: { lg: "18px", sm: "16px" },
              fontWeight: "400",
            }}
          >
            Email Id:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            sx={{ mb: 3, borderRadius: 2 }}
            placeholder="Enter your email id"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <Box sx={{ position: "relative", mb: 3 }}>
          <Stack>
            <Typography
              sx={{
                color: "rgb(100, 116, 139)",
                fontSize: { lg: "18px", sm: "16px" },
                fontWeight: "400",
              }}
            >
              Password:
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              sx={{ borderRadius: 2 }}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Box
            onClick={togglePasswordVisibility}
            sx={{
              position: "absolute",
              top: "70%",
              right: 10,
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </Box>
        </Box>

        <Box sx={{ textAlign: "right", mb: 3 }}>
          <Link href="#" underline="none" sx={{ color: "#6ec290" }}>
            Forgot Password?
          </Link>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 3,
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#6ec290",
          }}
          size="large"
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          align="center"
          variant="body2"
          sx={{
            fontSize: { lg: "18px", sm: "16px" },
            fontWeight: "500",
            lineHeight: { lg: "28px", sm: "26px" },
            color: "rgb(148, 163, 184)",
          }}
        >
          Don't have an account yet?{" "}
          <Link
            href="#"
            sx={{
              color: "#6ec290",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                textDecorationColor: "black",
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default LoginCard;
