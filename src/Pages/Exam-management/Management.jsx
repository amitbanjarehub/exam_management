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
import Sidebar from "./Sidebar/Sidebar";

const Management = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const [students, setStudents] = useState([]);
  const [studentsLive, setStudentsLive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const currentDay = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });
  const currentDateTime = new Date().toLocaleString();

  const dayDateTime = `${currentDay}, ${currentDateTime}`;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const filteredRows1 = studentsLive.filter((row) => {
    const matchesStatus = filterStatus === "All" || row.status === filterStatus;
    const matchesSearch =
      row.rollNo.toString().includes(searchTerm) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Add this useEffect to handle the back button press and prevent default behavior
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);

    const handleBackButton = (event) => {
      event.preventDefault();
      setOpenLogoutDialog(true);
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

  // Handle Verify Button Click
  const handleVerify = (id, image, rollno, status) => {
    console.log(
      "id,  status:============>>",
      id,     
      status
    );

    // if (id && image && rollno) {
    //   navigate("/camera", {
    //     state: { studentImage: image, studentId: id, studentRollno: rollno },
    //   });
    // } else {
    //   console.error("Invalid student data passed to handleVerify");
    // }

    // Check if the student is not "Present" before navigating
    if (status !== "present") {
      if (id && image && rollno) {
        navigate("/camera", {
          state: { studentImage: image, studentId: id, studentRollno: rollno },
        });
      } else {
        console.error("Invalid student data passed to handleVerify");
      }
    } else {
      // If status is "Present", show an alert
      alert("Student is already verified.");
    }
  };

  // Fetch students from the API (example code)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const liveData = await fetch(
          "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students"
        );

        if (!liveData.ok) {
          throw new Error(`Error: ${liveData.status}`);
        }

        const dataLive = await liveData.json();
        console.log("dataLive555:=======>>>", dataLive);

        setStudentsLive(dataLive?.students);
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
    window.history.pushState(null, null, window.location.pathname);
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
            {/* Ensure the onClick is added to open sidebar */}
            <GiHamburgerMenu color="green" size={32} onClick={toggleSidebar} />
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

      {/* Sidebar Component */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

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
                borderColor: "gray",
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
              onClick={() => setFilterStatus("present")}
              sx={{
                flex: 1,
                backgroundColor:
                  filterStatus === "present" ? "#2E7D32" : "transparent",
                color: filterStatus === "present" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "present" ? "#2E7D32" : "lightgray",
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
                  color: "black",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
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
                    {  console.log("row:---------->>>", row.studentId)}
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: "#2e7d32" }}
                        onClick={() =>
                          handleVerify(
                            row.studentId,
                            row.image,
                            row.rollNo,
                            row.status
                          )
                        }
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
