import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const ExamCenterAllocation = () => {
  // Dummy student list
  const dummyStudentList = [
    { id: 1, name: "John Doe", rollNo: 1001, dob: "2000-01-01" },
    { id: 2, name: "Jane Doe", rollNo: 1002, dob: "2000-02-01" },
    { id: 3, name: "Jack Doe", rollNo: 1003, dob: "2000-03-01" },
    { id: 4, name: "Jill Doe", rollNo: 1004, dob: "2000-04-01" },
  ];

  // Dummy exam center list
  const dummyCenterList = [
    { id: 1, name: "Center 1", location: "City A" },
    { id: 2, name: "Center 2", location: "City B" },
    { id: 3, name: "Center 3", location: "City C" },
  ];

  // State for the roll number range and selected center
  const [rollNoStart, setRollNoStart] = useState("");
  const [rollNoEnd, setRollNoEnd] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");

  // Function to handle center allocation based on roll number range
  const handleCenterAllocation = () => {
    if (rollNoStart && rollNoEnd && selectedCenter) {
      alert(
        `Allocating students from Roll No. ${rollNoStart} to ${rollNoEnd} to ${selectedCenter}`
      );
      // You can add logic here to update the allocated center in your data
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: "20px" }}>AayogDirector</Typography>
      <Grid container spacing={3}>
        {/* Register Student List */}
        {/* <Typography sx={{fontSize: "20px"}}>AayogDirector</Typography> */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Register Student List</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Roll No</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyStudentList.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>{student.dob}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Register Exam Center List */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Register Exam Center List</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Center Name</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyCenterList.map((center) => (
                      <TableRow key={center.id}>
                        <TableCell>{center.name}</TableCell>
                        <TableCell>{center.location}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="secondary">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Exam Center Allocation */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                Exam Center Allocating Through Roll No.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Roll No. Start"
                    type="number"
                    value={rollNoStart}
                    onChange={(e) => setRollNoStart(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Roll No. End"
                    type="number"
                    value={rollNoEnd}
                    onChange={(e) => setRollNoEnd(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedCenter}
                      onChange={(e) => setSelectedCenter(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Exam Center
                      </MenuItem>
                      {dummyCenterList.map((center) => (
                        <MenuItem key={center.id} value={center.name}>
                          {center.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleCenterAllocation}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ExamCenterAllocation;
