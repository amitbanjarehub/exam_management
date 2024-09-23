import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const CreateExamCenter = () => {
  const [centerData, setCenterData] = useState({
    center_name: "",
    category: "",
    center_status: "Pending", // default value
    center_address: "",
    seating_capacity_min: "",
    seating_capacity_max: "",
    alloted_seat: 0, // fixed value
    center_metaData: {
      priority: 0,
      division: "",
      city: "",
      district: "",
      state: "",
      is_allocated: false, // default value
      criteria_fullfill_percent: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examCenters, setExamCenters] = useState([]); // State for storing API data

  // Fetch data from API
  useEffect(() => {
    const fetchExamCenter = async () => {
      try {
        const liveData = await fetch(
          "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
        );
      
        if (!liveData.ok) {
          throw new Error(`Error: ${liveData.status}`);
        }

        const dataLive = await liveData.json();     
        setExamCenters(dataLive?.examCenters);
      
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExamCenter();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCenterData({ ...centerData, [name]: value });
  };

  const handleMetaDataChange = (e) => {
    const { name, value } = e.target;
    setCenterData({
      ...centerData,
      center_metaData: { ...centerData.center_metaData, [name]: value },
    });
  };


  const handleDelete = (id) => {
    alert(`Delete center with ID: ${id}`);
  };

  return (
    <Grid container spacing={3}>
      {/* Left Side: Exam Center Form */}
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exam Center Form
            </Typography>

            <Grid container spacing={2}>
              {/* Center Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Center Name"
                  name="center_name"
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={centerData.category}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="OBC">OBC</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Center Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Center Address"
                  name="center_address"
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              {/* Seating Capacity Min */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Seating Capacity (Min)"
                  name="seating_capacity_min"
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Seating Capacity Max */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Seating Capacity (Max)"
                  name="seating_capacity_max"
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              {/* Center Status (Fixed as "Pending") */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Center Status"
                  name="center_status"
                  value={centerData.center_status}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>

            {/* Metadata Fields */}
            <Typography variant="h6" gutterBottom>
              Center MetaData
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Priority"
                  name="priority"
                  onChange={handleMetaDataChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Division"
                  name="division"
                  onChange={handleMetaDataChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  onChange={handleMetaDataChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="District"
                  name="district"
                  onChange={handleMetaDataChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  name="state"
                  onChange={handleMetaDataChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side: Exam Center List */}
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exam Center List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Center Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Seats (Min/Max)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examCenters.map((center) => (
                    <TableRow key={center._id}>
                      <TableCell>{center.center_name}</TableCell>
                      <TableCell>{center.category}</TableCell>
                      <TableCell>{center.center_status}</TableCell>
                      <TableCell>
                        {center.seating_capacity_min} /{" "}
                        {center.seating_capacity_max}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(center._id)}
                        >
                          Delete
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
    </Grid>
  );
};

export default CreateExamCenter;
