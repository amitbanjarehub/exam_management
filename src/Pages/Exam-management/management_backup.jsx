import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardActions,
  Avatar,
  Stack,
  TextField,
  ButtonGroup,
  AppBar,
  Toolbar,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import LokSevaAayugLogo from "./loksevaaayug.png";
import Logo from "./logo.png";
import Person1 from "./person1.png";
import Person2 from "./person2.png";
import Person3 from "./Person3.png";
import Person4 from "./person4.png";
import Person5 from "./person5.png";
import ExamCard from "./ExamCard";
import Footer from "./Footer";
import NotFound from "./NoDatafound/NotFound";

const Management = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const currentDay = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });
  const currentDateTime = new Date().toLocaleString();

  const dayDateTime = `${currentDay}, ${currentDateTime}`;

  const rows = [
    {
      sNo: 1,
      image: Person1,
      rollNo: 1001,
      name: "John Doe",
      gender: "Male",
      age: 20,
      status: "Present",
      action: "Verify",
      address: "Sirsagate Bhilai Chhattisgarh",
      dob: "09/12/1997",
      room_no: "10",
    },
    {
      sNo: 2,
      image: Person2,
      rollNo: 1002,
      name: "Jane Smith",
      gender: "Female",
      age: 21,
      status: "Present",
      action: "Verify",
      address: "Sirsagate Bhilai Chhattisgarh",
      dob: "09/12/1997",
      room_no: "10",
    },
    {
      sNo: 3,
      image: Person3,
      rollNo: 1003,
      name: "Janshy Smeet",
      gender: "Female",
      age: 21,
      status: "Absent",
      action: "Verify",
      address: "Sirsagate Bhilai Chhattisgarh",
      dob: "09/12/1997",
      room_no: "10",
    },
    {
      sNo: 4,
      image: Person4,
      rollNo: 1004,
      name: "Anaa Iths",
      gender: "Female",
      age: 21,
      status: "Absent",
      action: "Verify",
      address: "Sirsagate Bhilai Chhattisgarh",
      dob: "09/12/1997",
      room_no: "10",
    },
    {
      sNo: 5,
      image: Person5,
      rollNo: 1005,
      name: "Smith Pal",
      gender: "Female",
      age: 21,
      status: "Absent",
      action: "Verify",
      address: "Sirsagate Bhilai Chhattisgarh",
      dob: "09/12/1997",
      room_no: "10",
    },
  ];

  const filteredRows1 = students.filter((row) => {
    const matchesStatus = filterStatus === "All" || row.status === filterStatus;
    const matchesSearch =
      row.rollNo.toString().includes(searchTerm) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Navigate to login page after logging out
  };

  // Add this useEffect to handle the back button press and prevent default behavior
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname); // Push an initial history state

    const handleBackButton = (event) => {
      event.preventDefault(); // Prevent default back behavior
      setOpenLogoutDialog(true); // Open the logout dialog when back is pressed
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const toggleExpandCard = (sNo) => {
    setExpandedCard(expandedCard === sNo ? null : sNo);
  };

  const handleQrSacnner = () => {
    navigate("/scanner");
  };

  // Fetch students from the API (example code)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.107:5001/api/all_students"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Re-push a state when the dialog is canceled, so the dialog opens again on the next back button press
  const handleCancel = () => {
    setOpenLogoutDialog(false);
    window.history.pushState(null, null, window.location.pathname); // Push a new state
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CssBaseline />
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

      <Box p={3} sx={{ marginTop: "80px", paddingBottom: "80px" }}>
        <Grid container justifyContent="left" mb={1}>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Welcome Admin!
          </Typography>
        </Grid>
        <Grid container justifyContent="left" mb={2}>
          <Typography variant="h6" sx={{ fontSize: "16px" }}>
            {dayDateTime}
          </Typography>
        </Grid>

        <ExamCard />

        <Grid
          container
          justifyContent="center"
          mb={2}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          <ButtonGroup
            fullWidth
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              "& .MuiButton-outlined": {
                borderColor: "gray", // Set border color to black
              },
            }}
          >
            <Button
              onClick={() => setFilterStatus("All")}
              sx={{
                flex: 1,
                backgroundColor:
                  filterStatus === "All" ? "#2E7D32" : "transparent",
                color: filterStatus === "All" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "All" ? "#2E7D32" : "lightgray",
                },
              }}
            >
              All
            </Button>

            <Button
              onClick={() => setFilterStatus("Present")}
              sx={{
                flex: 1,
                backgroundColor:
                  filterStatus === "Present" ? "#2E7D32" : "transparent",
                color: filterStatus === "Present" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "Present" ? "#2E7D32" : "lightgray",
                },
              }}
            >
              Present
            </Button>
            <Button
              onClick={() => setFilterStatus("Absent")}
              sx={{
                flex: 1,
                backgroundColor:
                  filterStatus === "Absent" ? "#2E7D32" : "transparent",
                color: filterStatus === "Absent" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "Absent" ? "#2E7D32" : "lightgray",
                },
              }}
            >
              Absent
            </Button>
          </ButtonGroup>
        </Grid>

        {/* Rest of your management page content */}

        <Grid container justifyContent="center" mb={2} sx={{ width: "100%" }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              label="Search by........"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginRight: "8px" }}
              fullWidth
              InputLabelProps={{
                sx: {
                  color: "black", // Default label color
                  "&.Mui-focused": {
                    color: "black", // Label color when focused
                  },
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                // backgroundColor: "rgb(120, 106, 255)",
                backgroundColor: "#388e3c",
                width: "20px",
              }}
              onClick={handleQrSacnner}
            >
              Scan
            </Button>
          </Stack>
        </Grid>

        <Grid container spacing={2}>
          {filteredRows1.length > 0 ? (
            filteredRows1.map((row) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={row._id}>
                <Card onClick={() => toggleExpandCard(row._id)}>
                  <Stack spacing={2} sx={{ width: "100%", pl: 0 }}>
                    {/* First Grid: Logo, Exam Name, and Date */}
                    <Grid container spacing={0} sx={{ pl: "4px", pr: "4px" }}>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          // border: "1px solid red",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 80,
                          height: 80,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            // marginLeft: "20px",
                            // border: "1px solid green",
                            // paddingBottom: "16px",
                            // marginBottom: "8px",
                          }}
                          src={row.image}
                          alt={row.name}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ marginTop: "32px" }}>
                        <Stack
                          direction="column"
                          alignItems="center"
                          spacing={0}
                        >
                          <Typography
                            sx={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            Name:
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {row.name}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} sx={{ marginTop: "32px" }}>
                        <Stack
                          direction="column"
                          alignItems="center"
                          spacing={0}
                        >
                          <Typography
                            sx={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            Roll No:
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {row.rollNo}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    {/* Conditionally render the second grid based on card expansion */}
                    {expandedCard === row._id && (
                      <>
                        <Grid container spacing={0}>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                Gender:
                              </Typography>
                              <Typography sx={{ fontSize: "12px" }}>
                                {row.gender}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                Status:
                              </Typography>
                              <Typography sx={{ fontSize: "12px" }}>
                                {row.status}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                Age
                              </Typography>
                              <Typography sx={{ fontSize: "12px" }}>
                                {row.age}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                Address:
                              </Typography>
                              <Typography
                                sx={{ fontSize: "12px", textAlign: "center" }}
                              >
                                {row.address}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                DOB:
                              </Typography>
                              <Typography sx={{ fontSize: "12px" }}>
                                {row.dob}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={0}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                Room/Hall No.
                              </Typography>
                              <Typography sx={{ fontSize: "12px" }}>
                                {row.room_no}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Stack>
                  {expandedCard === row._id && (
                    <CardActions>
                      <Button
                        variant="contained"
                        fullWidth
                        // sx={{ backgroundColor: "rgb(120, 106, 255)" }}
                        sx={{ backgroundColor: "#2e7d32" }}
                      >
                        {row.action}
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))
          ) : (
            <NotFound />
          )}
        </Grid>
      </Box>

      {/* Footer Component */}
      <Footer />

      {/* Logout confirmation dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Management;
