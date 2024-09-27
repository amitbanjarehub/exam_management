import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const CalucateStudCenterCapacity = ({ examName }) => {
  const [students, setStudents] = useState([]);
  const [examCenters, setExamCenters] = useState([]);
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [examDays, setExamDays] = useState(0);
  const [shift, setShift] = useState("");
  const [loading, setLoading] = useState(false);
  const [centerByDivision, setCenterByDivision] = useState([]);
  const [studentDataByDivision, setStudentDataByDivision] = useState([]);
  const [divisionResults, setDivisionResults] = useState([]); // Store calculation results
  const [verifiedExamCenters, setVerifiedExamCenters] = useState([]);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleDaysChange = (event) => {
    setExamDays(event.target.value);
  };

  const handleDivisionChange = (event) => {
    setDivision(event.target.value); // Update the state with selected value
  };

  // Fetch all students (using pagination)
  const fetchAllStudents = async () => {
    setLoading(true);
    let allStudents = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students?page=${currentPage}`
        );
        const { students, totalPages: pages } = response.data;

        allStudents = [...allStudents, ...students];
        totalPages = pages;
        currentPage++;
      }

      setStudents(allStudents);
      processStudentData(allStudents); // Call function to create the new array after fetching students
    } catch (error) {
      console.error("Error fetching students data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to process student data into the desired structure
  const processStudentData = (allStudents) => {
    const processedData = allStudents.map((student) => ({
      division: student.division,
      studentId: student.studentId,
      name: student.name,
      rollNo: student.rollNo,
    }));

    setStudentDataByDivision(processedData);
  };

  // Fetch exam centers
  const fetchExamCenters = async () => {
    try {
      let currentPage = 1;
      let totalPages = 1;
      let allExamCenters = [];

      while (currentPage <= totalPages) {
        try {
          // API request for each page
          const response = await axios.get(
            `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter`,
            {
              params: {
                page: currentPage,
              },
            }
          );

          const { examCenters: centers, totalPages: total } = response.data;
          allExamCenters = [...allExamCenters, ...centers]; // Collect all centers
          totalPages = total; // Update total pages
          currentPage++; // Move to next page
        } catch (error) {
          console.error("Error fetching exam center data:", error);
          break;
        }
      }

      setExamCenters(allExamCenters);
      organizeCentersByDivision(allExamCenters);
    } catch (error) {
      console.error("Error fetching exam centers data:", error);
    }
  };

  // Organize exam centers by division
  const organizeCentersByDivision = (centers) => {
    const notAllocatedVerified = centers.reduce((acc, center) => {
      const {
        division,
        center_name,
        seating_capacity_min,
        seating_capacity_max,
        center_status,
        is_allocated,
      } = center;
      const capacity = `${seating_capacity_max}`;

      if (center_status === "verified" && !is_allocated) {
        const centerData = {
          center_name: center_name,
          seating_capacity: seating_capacity_max,
          status: center_status,
          is_allocated,
        };

        const existingDivision = acc.find((item) => item.division === division);

        if (existingDivision) {
          existingDivision.centers.push(centerData);
        } else {
          acc.push({
            division,
            centers: [centerData],
          });
        }
      }

      return acc;
    }, []);

    setCenterByDivision(notAllocatedVerified);
  };

  // Fetch students and exam centers on component mount
  useEffect(() => {
    fetchAllStudents();
    fetchExamCenters();
  }, []);

  const calculateExamDays = () => {
    // Check if both shift and examDays are selected
    if (!shift || !examDays) {
      alert("Please select both shift and day before calculating.");
      return; // Stop the calculation if either is missing
    }

    const divisionResults = studentDataByDivision.reduce((acc, student) => {
      const { division } = student;

      if (!acc[division]) {
        acc[division] = {
          totalStudents: 0,
          totalCapacityPerDay: 0,
          remainingStudents: 0,
          totalCapacity: 0, // Initialize for total capacity
        };
      }

      acc[division].totalStudents += 1; // Count students for each division

      return acc;
    }, {});

    // Now calculate capacities based on centers
    centerByDivision.forEach((divisionData) => {
      const { division, centers } = divisionData;

      if (divisionResults[division]) {
        // Calculate total capacity per shift
        const totalCapacityPerShift = centers.reduce((acc, center) => {
          return acc + center.seating_capacity;
        }, 0); // Initialize with 0 to avoid NaN

        divisionResults[division].totalCapacity = totalCapacityPerShift; // Store total capacity for 1 day

        // Total capacity for the selected days and shifts
        divisionResults[division].totalCapacityPerDay =
          totalCapacityPerShift * examDays * shift;

        const remaining =
          divisionResults[division].totalStudents -
          divisionResults[division].totalCapacityPerDay;
        divisionResults[division].remainingStudents =
          remaining > 0 ? remaining : 0;
      }
    });

    setDivisionResults(Object.entries(divisionResults)); // Convert to array
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full screen height to center the loader vertically
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log("examCenters:===========>>>", examCenters);
  console.log("centerByDivision:=====>>", centerByDivision);

  return (
    <Stack spacing={3} sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        <Typography sx={{ fontSize: "20px", paddingTop: "20px" }}>
          Exam Name -
        </Typography>
        <Typography sx={{ fontSize: "20px", paddingTop: "20px" }}>
          {examName}
        </Typography>
      </Stack>
      {/* <Typography sx={{ fontSize: "20px" }}>
        Calculating exam center with student capacity
      </Typography> */}

      <Grid container spacing={2} sx={{ width: "98%" }}>
        {/* Exam Days Dropdown */}
        <Grid item xs={12} md={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="day-select-label">Select day</InputLabel>
            <Select
              labelId="day-select-label"
              id="day-select"
              value={examDays}
              label="Select day"
              onChange={handleDaysChange}
            >
              <MenuItem value={1}>Day 1</MenuItem>
              <MenuItem value={2}>Day 2</MenuItem>
              <MenuItem value={3}>Day 3</MenuItem>
              <MenuItem value={4}>Day 4</MenuItem>
              <MenuItem value={5}>Day 5</MenuItem>
              <MenuItem value={6}>Day 6</MenuItem>
              <MenuItem value={7}>Day 7</MenuItem>
              <MenuItem value={8}>Day 8</MenuItem>
              <MenuItem value={9}>Day 9</MenuItem>
              <MenuItem value={10}>Day 10</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ width: "100%", marginBottom: "12px", marginTop: "12px" }}
          >
            <InputLabel id="shift-select-label">Select Shift</InputLabel>
            <Select
              labelId="shift-select-label"
              id="shift-select"
              value={shift}
              label="Select Shift"
              onChange={handleShiftChange}
            >
              <MenuItem value={1}>Shift 1</MenuItem>
              <MenuItem value={2}>Shift 2</MenuItem>
              <MenuItem value={3}>Shift 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="division-select-label">Select Division</InputLabel>
            <Select
              labelId="division-select-label"
              id="division-select"
              value={division} // Use state value here
              label="Select Division"
              onChange={handleDivisionChange} // Handle change event
            >
              <MenuItem value={1}>Durg Division</MenuItem>
              <MenuItem value={2}>Raipur Division</MenuItem>
              <MenuItem value={3}>Bilaspur Division</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <Button variant="contained" onClick={calculateExamDays}>
            Calculate
          </Button>
        </Grid>
      </Grid>

      {/* Display the results after calculation */}
      <div>
        <h4>Division Results:</h4>
        {divisionResults.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="division table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    S.No.
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Division
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Centers & Capacity
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Total Students
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>Day</TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Shift
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Total Capacity (for 1 day and 1 shifts)
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Total Capacity (for {examDays} days and {shift} shifts)
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Remaining Students
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {divisionResults.map(([division, result], index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{division}</TableCell>
                    <TableCell>
                      <ul>
                        {centerByDivision
                          .find((d) => d.division === division)
                          ?.centers.map((center, idx) => (
                            <li key={idx} style={{ marginBottom: "12px" }}>
                              {center.center_name} - Capacity:{" "}
                              {center.seating_capacity}
                            </li>
                          ))}
                      </ul>
                    </TableCell>
                    <TableCell>{result.totalStudents}</TableCell>
                    <TableCell>{examDays}</TableCell>
                    <TableCell>{shift}</TableCell>
                    <TableCell>{result.totalCapacity}</TableCell>{" "}
                    {/* New column */}
                    <TableCell>{result.totalCapacityPerDay}</TableCell>
                    <TableCell>{result.remainingStudents}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        //   onClick={() => handleDelete(center._id)}
                      >
                        Request Center
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>
            No data calculated yet. Please select day and shift, then click
            "Calculate".
          </p>
        )}
      </div>
    </Stack>
  );
};

export default CalucateStudCenterCapacity;
