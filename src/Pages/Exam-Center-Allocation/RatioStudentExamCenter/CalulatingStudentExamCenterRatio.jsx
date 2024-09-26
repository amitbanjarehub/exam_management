
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
} from "@mui/material";

const CalculatingStudentExamCenterRatio = () => {
  const [students, setStudents] = useState([]);
  const [examCenters, setExamCenters] = useState([]);
  const [examDays, setExamDays] = useState(0);
  const [shift, setShift] = useState("");
  const [loading, setLoading] = useState(false);
  const [centerByDivision, setCenterByDivision] = useState([]);
  const [studentDataByDivision, setStudentDataByDivision] = useState([]);
  const [divisionResults, setDivisionResults] = useState([]); // Store calculation results

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleDaysChange = (event) => {
    setExamDays(event.target.value);
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
      const response = await axios.get(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
      );
      const centers = response.data.examCenters;
      setExamCenters(centers);
      organizeCentersByDivision(centers); // Organize centers after fetching
    } catch (error) {
      console.error("Error fetching exam centers data:", error);
    }
  };

  // Organize exam centers by division
  const organizeCentersByDivision = (centers) => {
    const divisionMap = {};

    centers.forEach((center) => {
      const division = center.division;

      if (!divisionMap[division]) {
        divisionMap[division] = [];
      }

      divisionMap[division].push({
        center_name: center.center_name,
        seating_capacity: center.seating_capacity_max,
      });
    });

    // Convert the divisionMap into an array of objects
    const result = Object.keys(divisionMap).map((division) => ({
      division,
      centers: divisionMap[division],
    }));

    setCenterByDivision(result);
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
          totalCapacity: 0, // For the new column
        };
      }

      acc[division].totalStudents += 1;

      return acc;
    }, {});

    centerByDivision.forEach((divisionData) => {
      const { division, centers } = divisionData;

      if (divisionResults[division]) {
        const totalCapacityPerShift =
          centers.reduce((acc, center) => acc + center.seating_capacity, 0) *
          shift;

        // Total capacity for the selected shifts and days
        divisionResults[division].totalCapacityPerDay =
          totalCapacityPerShift * examDays;

        divisionResults[division].totalCapacity = totalCapacityPerShift; // Store total capacity for 1 day and selected shifts

        const remaining =
          divisionResults[division].totalStudents -
          divisionResults[division].totalCapacityPerDay;
        divisionResults[division].remainingStudents =
          remaining > 0 ? remaining : 0;
      }
    });

    setDivisionResults(Object.entries(divisionResults)); // Store the results as an array
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={3}>
      <h3>Calculating exam center with student capacity</h3>

      <Grid container spacing={2}>
        {/* Exam Days Dropdown */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth>
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
        </Grid>

        {/* Shift Dropdown */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
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
        </Grid>
      </Grid>

      <Button variant="contained" onClick={calculateExamDays}>
        Calculate
      </Button>

      {/* Display the results after calculation */}
      <div>
        <h4>Division Results:</h4>
        {divisionResults.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="division table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Division</TableCell>
                  <TableCell>Centers & Capacity</TableCell>
                  <TableCell>Total Students</TableCell>
                  <TableCell>Day</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>
                    Total Capacity (for 1 day and {shift} shifts)
                  </TableCell>
                  <TableCell>
                    Total Capacity (for {examDays} days and {shift} shifts)
                  </TableCell>
                  <TableCell>Remaining Students</TableCell>
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
                            <li key={idx}>
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

export default CalculatingStudentExamCenterRatio;
