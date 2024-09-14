import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
  Stack,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Logo from "./logo.png";
import { MdMenu } from "react-icons/md";
import { IoChevronDown, IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const theme = useTheme();
  const isLgOrXl = useMediaQuery(theme.breakpoints.up("lg"));

  const handleMobileMenuOpen = () => {
    setSlideDirection("right");
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setSlideDirection("left");
    setMobileMenuOpen(false);
  };
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Stack>
      <AppBar
        sx={{
          backgroundColor: "white",
          display: { xl: "flex" },
          flexDirection: { xl: "row", lg: "row" },
          justifyContent: { xl: "center", lg: "center", md: "column" },
          //   border: "1px solid red",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xl: "70%", lg: "80%" },
          }}
        >
          <Stack
            sx={{
              height: { lg: "30px", xl: "36", sm: "28px", xs: "28px" },
              width: { lg: "120px", xl: "198px", sm: "140px", xs: "140px" },
            }}
          >
            <img src={Logo} alt="logo" />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              color={"black"}
              sx={{
                fontSize: {
                  lg: "18px",
                  xl: "18px",
                  sm: "12px",
                  xs: "12px",
                },
                color: "rgb(148, 163, 184)",
                fontWeight: "500",
                marginTop: {
                  lg: "8px",
                  xl: "8px",
                  sm: "4px",
                  xs: "4px",
                },
                marginRight: {
                  lg: "8px",
                  xl: "8px",
                  sm: "8px",
                  xs: "8px",
                },
              }}
            >
              Not a user ?
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginRight: "8px",
                display: "flex",
                alignItems: "center",
                height: { lg: "42px", xl: "42px", sm: "28px", xs: "28px" },
                width: { lg: "142px", xl: "142px", sm: "80px", xs: "80px" },
                fontSize: { lg: "12px", xl: "14px", sm: "8px", xs: "8px" },
                // borderColor: "rgb(120, 106, 255)",
                border: "none",
                color: "rgb(120, 106, 255)",
                backgroundColor: "rgb(244 240 255)",
                "&:hover": {
                  backgroundColor: "rgb(120, 106, 255)",
                  color: "white",
                  borderColor: "rgb(120, 106, 255)",
                },
              }}
             
              onClick={handleLoginClick}
            >
              {/* <IoPersonSharp style={{ marginRight: "8px" }} /> */}
              Sign up
            </Button>
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
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              lg: "28px",
              xl: "28px",
              sm: "24px",
              xs: "24px",
            },
            fontWeight: "700",
            color: " rgb(30, 41, 59)",
          }}
        >
          Login to continue{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </Typography>

        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
          fullWidth
          size="large"
          sx={{ mb: 3, textTransform: "none", borderRadius: 2 }}
        >
          <Typography
            sx={{
              fontSize: {
                lg: "18px",
                xl: "18px",
                sm: "14px",
                xs: "14px",
              },
              fontWeight: "500",
              color: "rgb(51, 65, 85)",
            }}
          >
            Sign in with Google for Work
          </Typography>
        </Button>

        <Divider
          sx={{
            mb: 3,
            color: "rgb(100, 116, 139)",
            fontWeight: "400",
            fontSize: {
              lg: "14px",
              xl: "14px",
              sm: "14px",
              xs: "14px",
            },
            lineHeight: {
              lg: "20px",
              xl: "20px",
              sm: "16px",
              xs: "16px",
            },
          }}
        >
          Or continue with
        </Divider>
        <Stack>
          <Typography
            sx={{
              color: "rgb(100, 116, 139)",
              fontSize: { lg: "18px", sm: "16px" },
              fontWeight: "400",
            }}
          >
            Work Email
          </Typography>
          <TextField
            //   label="Work Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, borderRadius: 2 }}
            size="small"
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
              Your Password
            </Typography>
            <TextField
              // label="Your Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              sx={{ borderRadius: 2 }}
              size="small"
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
          <Link href="#" underline="none" sx={{ color: "rgb(120, 106, 255)" }}>
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
            backgroundColor: "rgb(120, 106, 255)",
          }}
          size="large"
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
          Don't have a Mailmodo account yet?{" "}
          <Link
            href="#"
            sx={{
              color: "rgb(120, 106, 255)",
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
