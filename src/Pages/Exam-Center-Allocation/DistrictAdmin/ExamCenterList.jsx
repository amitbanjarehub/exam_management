

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
  Stack,
} from "@mui/material";
import DistrictAdminCards from "../Cards/DistrictAdminCards";

const ExamCenterList = () => {
  const [centerData, setCenterData] = useState({
    center_name: "",
    category: "",
    center_status: "active", // Default value is 'active'
    center_address: "",
    seating_capacity_min: "",
    seating_capacity_max: "",
    alloted_seat: 30, // Fixed value as per your example
    center_metaData: {
      type: "exam", // Adding type as per your example
      other_details: "This is a test exam center.", // Adding other_details
    },
    priority: 1, // Default value
    division: "",
    city: "",
    district: "",
    state: "",
    is_allocated: false, // Default value
    is_verified: true, // Default value
    criteria_fullfill_percent: 80, // Default value
    created_by: "admin", // Default value
  });

  const [examCenters, setExamCenters] = useState([]); // State for storing API data
  const [filteredCenters, setFilteredCenters] = useState([]); // To store filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // For filter by status

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
        setFilteredCenters(dataLive?.examCenters); // Set filtered data initially
      } catch (err) {
        console.error(err);
      }
    };

    fetchExamCenter();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCenterData({ ...centerData, [name]: value });
  };

  // Search function
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filtered = examCenters.filter((center) =>
      center.center_name.toLowerCase().includes(searchValue)
    );
    setFilteredCenters(filtered);
  };

  // Filter by status
  const handleFilterChange = (e) => {
    const statusValue = e.target.value;
    setFilterStatus(statusValue);

    if (statusValue === "") {
      setFilteredCenters(examCenters); // If no filter, show all
    } else {
      const filtered = examCenters.filter(
        (center) => center.center_status === statusValue
      );
      setFilteredCenters(filtered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload to match the required format
      const payload = {
        center_name: centerData.center_name,
        category: centerData.category,
        center_status: centerData.center_status,
        center_address: centerData.center_address,
        seating_capacity_min: parseInt(centerData.seating_capacity_min, 10),
        seating_capacity_max: parseInt(centerData.seating_capacity_max, 10),
        alloted_seat: centerData.alloted_seat,
        center_metaData: {
          type: centerData.center_metaData.type,
          other_details: centerData.center_metaData.other_details,
        },
        priority: centerData.priority,
        division: centerData.division,
        city: centerData.city,
        district: centerData.district,
        state: centerData.state,
        is_allocated: centerData.is_allocated,
        is_verified: centerData.is_verified,
        criteria_fullfill_percent: centerData.criteria_fullfill_percent,
        created_by: centerData.created_by,
      };

      const response = await fetch(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form data submitted successfully!");
    } catch (err) {
      alert(`Error submitting form: ${err.message}`);
    }
  };

  const handleDelete = (id) => {
    alert(`Delete center with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit center with ID: ${id}`);
  };

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Stack sx={{ marginBottom: "40px" }}>
          <DistrictAdminCards />
        </Stack>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exam Center List
            </Typography>

           <Stack sx={{display: "flex",flexDirection: "row", justifyContent: "space-around"}}>
             {/* Search Bar */}
             <TextField
              label="Search by Center Name"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ marginBottom: "16px", width: "49%" }}
            />

            {/* Filter Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: "16px", width: "49%" }}>
              <InputLabel id="status-filter-label">Filter by Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filterStatus}
                onChange={handleFilterChange}
                label="Filter by Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
           </Stack>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Center Name</TableCell>
                    <TableCell>Center Is Allocated</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Seats (Min/Max)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCenters.map((center) => (
                    <TableRow key={center._id}>
                      <TableCell>{center.center_name}</TableCell>
                      <TableCell>
                        {center.is_allocated ? "True" : "False"}
                      </TableCell>
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

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(center._id)}
                          sx={{ marginLeft: "8px" }}
                        >
                          Edit
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
    </div>
  );
};

export default ExamCenterList;
