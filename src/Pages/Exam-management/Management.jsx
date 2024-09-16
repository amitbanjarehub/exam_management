import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Stack,
  TextField,
  ButtonGroup,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Logo from "./logo.png";
import Person1 from "./person1.png";
import Person2 from "./person2.png";
import Person3 from "./Person3.png";
import Person4 from "./person4.png";
import Person5 from "./person5.png";
import { GiHamburgerMenu } from "react-icons/gi";
import LokSevaAayugLogo from "./loksevaaayug.png";
import ExamCard from "./ExamCard";
import Footer from "./Footer";

const Management = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null); // State to track expanded card

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

  // Filter students based on status and search term
  const filteredRows = rows.filter((row) => {
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

  const toggleExpandCard = (sNo) => {
    setExpandedCard(expandedCard === sNo ? null : sNo);
  };

  const handleQrSacnner = () => {
    navigate("/scanner");
  };

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

        {/* <Grid
          container
          justifyContent="center"
          mb={2}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          <ButtonGroup
            fullWidth
            variant="outlined"
            aria-label="Basic button group"
          >
            <Button onClick={() => setFilterStatus("All")} sx={{ flex: 1, }}>
              All
            </Button>
            <Button onClick={() => setFilterStatus("Present")} sx={{ flex: 1 }}>
              Present
            </Button>
            <Button onClick={() => setFilterStatus("Absent")} sx={{ flex: 1 }}>
              Absent
            </Button>
          </ButtonGroup>
        </Grid> */}

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
          >
            <Button
              onClick={() => setFilterStatus("All")}
              sx={{
                flex: 1,
                backgroundColor:
                  filterStatus === "All" ? "violet" : "transparent",
                color: filterStatus === "All" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "All" ? "darkviolet" : "lightgray",
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
                  filterStatus === "Present" ? "violet" : "transparent",
                color: filterStatus === "Present" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "Present" ? "darkviolet" : "lightgray",
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
                  filterStatus === "Absent" ? "violet" : "transparent",
                color: filterStatus === "Absent" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    filterStatus === "Absent" ? "darkviolet" : "lightgray",
                },
              }}
            >
              Absent
            </Button>
          </ButtonGroup>
        </Grid>

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
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "rgb(120, 106, 255)", width: "20px" }}
              onClick={handleQrSacnner}
            >
              Scan
            </Button>
          </Stack>
        </Grid>

        <Grid container spacing={2}>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={row.sNo}>
                <Card onClick={() => toggleExpandCard(row.sNo)}>
                  <Stack spacing={2} sx={{ width: "100%", pl: 0 }}>
                    {/* First Grid: Logo, Exam Name, and Date */}
                    <Grid container spacing={1} sx={{ pl: "4px", pr: "4px" }}>
                      <Grid item xs={4}>
                        <Avatar
                          sx={{ width: 60, height: 60, marginLeft: "20px" }}
                          src={row.image}
                          alt={row.name}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Stack
                          direction="column"
                          alignItems="center"
                          spacing={1}
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
                      <Grid item xs={4}>
                        <Stack
                          direction="column"
                          alignItems="center"
                          spacing={1}
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
                    {expandedCard === row.sNo && (
                      <>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={1}
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
                              spacing={1}
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
                              spacing={1}
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

                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <Stack
                              direction="column"
                              alignItems="center"
                              spacing={1}
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
                              spacing={1}
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
                              spacing={1}
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
                  {expandedCard === row.sNo && (
                    <CardActions>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: "rgb(120, 106, 255)" }}
                      >
                        {row.action}
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center">
              No Data Found
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Management;
